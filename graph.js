class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let v of vertexArray){
      this.nodes.add(v)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let adj of vertex.adjacent){
      this.removeEdge(vertex, adj)
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let result = []
    let seen = new Set([start]);
    let stack = [start];

    while(stack.length > 0){
      const curNode = stack.pop()
      result.push(curNode.value)

      for(let adjNode of curNode.adjacent){
        if(!seen.has(adjNode)){
          seen.add(adjNode)
          stack.push(adjNode)
        }
      }
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let seen = new Set([start.value])
    let queue = [start]

    while(queue.length > 0){
      const curNode = queue.shift()
      
      for(let adjNode of curNode.adjacent){
        if(!seen.has(adjNode.value)){
          queue.push(adjNode)
          seen.add(adjNode.value)
        }
      }
    }
    return [...seen];
  }
}

module.exports = {Graph, Node}