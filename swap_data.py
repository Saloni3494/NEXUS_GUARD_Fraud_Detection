import os
import shutil
import torch
import pandas as pd

def main():
    src_dir = r"d:\Hackathons\37-BOI-Hackathon-26\NEXUS_GUARD\Model\shared-data"
    dst_dir = r"d:\Hackathons\37-BOI-Hackathon-26\NEXUS_GUARD\shared-data"
    
    if not os.path.exists(dst_dir):
        os.makedirs(dst_dir)
        
    print(f"Copying artifacts from {src_dir} to {dst_dir}...")
    
    # Copy essential artifacts
    files_to_copy = [
        "mule_model.pth", 
        "processed_graph.pt", 
        "model_meta.json", 
        "eval_report.json"
    ]
    
    for f in files_to_copy:
        src_path = os.path.join(src_dir, f)
        dst_path = os.path.join(dst_dir, f)
        if os.path.exists(src_path):
            shutil.copy2(src_path, dst_path)
            print(f"  Copied {f}")
        else:
            print(f"  Warning: {f} not found in source directory.")
            
    print("\nGenerating nodes.csv and transactions.csv from graph data...")
    graph_path = os.path.join(dst_dir, "processed_graph.pt")
    if os.path.exists(graph_path):
        graph = torch.load(graph_path, map_location="cpu", weights_only=False)
        num_nodes = graph.num_nodes
        print(f"  Graph has {num_nodes} nodes.")
        
        # Create nodes.csv with 1-indexed IDs to match DataSet.csv implicit Pandas indices
        node_ids = [str(i + 1) for i in range(num_nodes)]
        
        # Extract is_fraud labels from graph.y
        if hasattr(graph, 'y') and graph.y is not None:
            is_fraud = graph.y.numpy()
        else:
            is_fraud = [0] * num_nodes
            
        # ==========================================
        # CALCULATE TRUE ML GRAPH METRICS
        # ==========================================
        print("  Calculating true graph topology metrics...")
        
        # 1. Build adjacency list
        adj = {i: set() for i in range(num_nodes)}
        if hasattr(graph, 'edge_index') and graph.edge_index is not None:
            sources = graph.edge_index[0].numpy()
            targets = graph.edge_index[1].numpy()
            for s, t in zip(sources, targets):
                adj[s].add(t)
                adj[t].add(s) # Undirected for community detection
                
        # 2. Find Communities (Connected Components)
        visited = set()
        community_id_map = {}
        communities = {}
        current_cid = 1
        
        for i in range(num_nodes):
            if i not in visited:
                # BFS to find component
                queue = [i]
                comp = []
                visited.add(i)
                while queue:
                    curr = queue.pop(0)
                    comp.append(curr)
                    community_id_map[curr] = current_cid
                    for neighbor in adj[curr]:
                        if neighbor not in visited:
                            visited.add(neighbor)
                            queue.append(neighbor)
                communities[current_cid] = comp
                current_cid += 1
                
        # 3. Calculate Community Fraud Rates
        community_fraud_rate_map = {}
        for cid, nodes in communities.items():
            fraud_count = sum(1 for n in nodes if is_fraud[n] == 1)
            community_fraud_rate_map[cid] = fraud_count / len(nodes)
            
        # 4. Calculate Second-Hop Fraud Rates
        second_hop_rates = []
        for i in range(num_nodes):
            hop1 = adj[i]
            hop2 = set()
            for h1 in hop1:
                hop2.update(adj[h1])
            # Combine 1st and 2nd hop neighbors (excluding self)
            neighborhood = (hop1 | hop2) - {i}
            if len(neighborhood) > 0:
                fraud_neighbors = sum(1 for n in neighborhood if is_fraud[n] == 1)
                second_hop_rates.append(fraud_neighbors / len(neighborhood))
            else:
                second_hop_rates.append(0.0)
                
        # Prepare final columns
        final_community_ids = [community_id_map[i] for i in range(num_nodes)]
        final_community_rates = [community_fraud_rate_map[cid] for cid in final_community_ids]
        
        # Ring Membership: Only assign a ring ID if the community has a significant fraud concentration
        final_ring_membership = [
            cid if community_fraud_rate_map[cid] > 0.15 and is_fraud[i] == 1 else 0 
            for i, cid in enumerate(final_community_ids)
        ]
        # ==========================================

        nodes_df = pd.DataFrame({
            "node_id": node_ids,
            "is_fraud": is_fraud,
            "community_id": final_community_ids,
            "ring_membership": final_ring_membership,
            "community_fraud_rate": final_community_rates,
            "second_hop_fraud_rate": second_hop_rates
        })
        nodes_out = os.path.join(dst_dir, "nodes.csv")
        nodes_df.to_csv(nodes_out, index=False)
        print(f"  Saved {nodes_out} with {nodes_df['is_fraud'].sum()} fraud nodes.")
        
        # Create transactions.csv from edge_index
        if hasattr(graph, 'edge_index') and graph.edge_index is not None:
            # edge_index is shape [2, num_edges]
            sources = graph.edge_index[0].numpy()
            targets = graph.edge_index[1].numpy()
            
            # Map indices back to string IDs (1-indexed)
            src_ids = [str(i + 1) for i in sources]
            tgt_ids = [str(i + 1) for i in targets]
            
            # Use 1.0 as a default amount since the graph is based on feature similarity
            tx_df = pd.DataFrame({
                "source": src_ids,
                "target": tgt_ids,
                "amount": [1.0] * len(src_ids)
            })
            tx_out = os.path.join(dst_dir, "transactions.csv")
            tx_df.to_csv(tx_out, index=False)
            print(f"  Saved {tx_out} with {len(src_ids)} edges.")
        else:
            print("  Warning: No edge_index found in graph.")
    else:
        print(f"Error: {graph_path} not found.")
        
    print("\nMigration complete!")

if __name__ == "__main__":
    main()
