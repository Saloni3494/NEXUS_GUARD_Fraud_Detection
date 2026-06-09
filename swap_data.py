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
            
        nodes_df = pd.DataFrame({
            "node_id": node_ids,
            "is_fraud": is_fraud,
            "community_id": [0] * num_nodes,
            "ring_membership": [0] * num_nodes,
            "community_fraud_rate": [0.0] * num_nodes,
            "second_hop_fraud_rate": [0.0] * num_nodes
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
