import pandas as pd
import numpy as np
import torch

from sklearn.model_selection import train_test_split
from sklearn.neighbors import kneighbors_graph
from sklearn.preprocessing import LabelEncoder
from torch_geometric.data import Data

df = pd.read_csv("DataSet.csv")

TARGET = "F3924"

# ---------------------------
# labels
# ---------------------------
y = df[TARGET].astype(int).values

# ---------------------------
# features
# ---------------------------
X = df.drop(columns=[TARGET]).copy()

# encode categoricals
for col in X.select_dtypes(include=["object", "str"]).columns:
        X[col] = LabelEncoder().fit_transform(
        X[col].astype(str)
    )

# fill missing
X = X.fillna(-999)

X = X.astype(np.float32)

# ---------------------------
# build graph
# ---------------------------
A = kneighbors_graph(
    X.values,
    n_neighbors=5,
    metric="cosine",
    mode="connectivity",
    include_self=False
)

row, col = A.nonzero()

edge_index = torch.tensor(
    np.vstack([row, col]),
    dtype=torch.long
)

# make graph undirected
edge_index = torch.cat(
    [edge_index, edge_index.flip(0)],
    dim=1
)

# ---------------------------
# tensors
# ---------------------------
x = torch.tensor(X.values, dtype=torch.float)
y = torch.tensor(y, dtype=torch.long)

# ---------------------------
# splits
# ---------------------------
n = len(df)
idx = np.arange(n)

train_idx, test_idx = train_test_split(
    idx,
    test_size=0.2,
    stratify=y,
    random_state=42
)

train_idx, val_idx = train_test_split(
    train_idx,
    test_size=0.2,
    stratify=y[train_idx],
    random_state=42
)

train_mask = torch.zeros(n, dtype=torch.bool)
val_mask   = torch.zeros(n, dtype=torch.bool)
test_mask  = torch.zeros(n, dtype=torch.bool)

train_mask[train_idx] = True
val_mask[val_idx]     = True
test_mask[test_idx]   = True

data = Data(
    x=x,
    edge_index=edge_index,
    y=y,
    train_mask=train_mask,
    val_mask=val_mask,
    test_mask=test_mask
)

torch.save(data, "processed_graph.pt")

print(data)
print("Nodes:", data.num_nodes)
print("Edges:", data.num_edges)
print("Features:", data.num_features)

import torch
print(torch.unique(data.y, return_counts=True))

print("Train fraud:", data.y[data.train_mask].sum().item())
print("Val fraud:", data.y[data.val_mask].sum().item())
print("Test fraud:", data.y[data.test_mask].sum().item())