import math

def floyd_warshall_all_pairs_shortest_paths(W):
    n = len(W)
    D = [[[float('inf')] * n for _ in range(n)] for _ in range(n + 1)]
    π = [[[None] * n for _ in range(n)] for _ in range(n + 1)]
    for u in range(n):
        for v in range(n):
            if u == v:
                D[0][u][v] = 0
                π[0][u][v] = None
            elif W[u][v] != float('inf'):
                D[0][u][v] = W[u][v]
                π[0][u][v] = u+1
	
    for k in range(1, n + 1):
        for i in range(n):
            for j in range(n):
                if D[k - 1][i][j] > D[k - 1][i][k - 1] + D[k - 1][k - 1][j]:
                    D[k][i][j] = D[k - 1][i][k - 1] + D[k - 1][k - 1][j]
                    π[k][i][j] = π[k - 1][k - 1][j]  # Corrected indexing here
                else:
                    D[k][i][j] = D[k - 1][i][j]
                    π[k][i][j] = π[k - 1][i][j]

    return D, π



W = [[0, math.inf, -2, math.inf],
     [4, 0, 3, math.inf],
     [math.inf, math.inf, 0, 2],
     [math.inf, -1, math.inf, 0]]

matrica_puteva, pi = floyd_warshall_all_pairs_shortest_paths(W)

print('D')

for red in matrica_puteva:
    for redd in red:
        print(redd)
    print('\n')

print('pi')

for red in pi:
    for redd in red:
        print(redd)
    print('\n')