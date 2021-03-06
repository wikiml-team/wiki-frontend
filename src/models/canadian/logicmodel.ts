import { toNumber } from "lodash";
import { Graph, Edge } from "models/graph";

export type LogicmodelVertex = {
  id: string;
  text: string;
  level: number;
};

export default class LogicmodelGraph extends Graph<LogicmodelVertex> {
  generateId(parentId: string, level: number, num: number): string {
    return parentId
      .slice(0, level + 1)
      .concat((num + 1).toString())
      .padEnd(4, "0");
  }

  generateSiblingId(siblingId: string, num?: number) {
    // Get level
    const level = this.getNodeLevel(siblingId);

    // Generate new id
    const root = siblingId.slice(0, level);
    const order = num ? num : toNumber(siblingId[level]) + 1;
    const id = (root + order.toString()).padEnd(4, "0");

    return { id: id.toString(), level: level, order };
  }

  setNodeText(id: string, char: string): LogicmodelGraph {
    const node = this.vertex.find((v) => v.id === id);

    if (node) {
      node.text += char;
    }

    return this;
  }

  getInmediateTree(id: string) {
    const outputs = this.edges
      .filter((e) => e.from === id)
      .map((e) => this.findNode(e.to));

    return { node: this.findNode(id), outputs: outputs };
  }

  getParentId(id: string, level: number): string {
    return id.slice(0, level).padEnd(4, "0");
  }

  addNode(parentId: string): LogicmodelGraph {
    const parentNode = this.findNode(parentId)!;

    const newNode = {
      id: this.generateId(
        parentId,
        parentNode.level,
        this.getChildrenCount(parentId)
      ),
      text: "",
      level: parentNode.level + 1,
    } as LogicmodelVertex;

    // Add to graph
    this.vertex.push(newNode);
    this.edges.push({ from: parentNode.id, to: newNode.id } as Edge);

    return this;
  }

  addSibling(siblingId: string) {
    const { id, level, order } = this.generateSiblingId(siblingId);

    const newNode = {
      id: id,
      text: "added node " + id,
      level: level,
    } as LogicmodelVertex;

    // Fix siblings ids
    const parentId = this.getParentId(id.toString(), level);
    const siblingsIds = this.findChildrenIds(parentId).sort();

    // Updating siblings vertex and edges and its descendant's
    for (let i = order - 1; i < siblingsIds.length; i++) {
      const oldId = siblingsIds[i];

      // Find sibling
      const childNode = this.findNode(oldId);

      if (childNode) {
        // Update sibling vertex & edges
        const newInfo = this.generateSiblingId(oldId);
        childNode.id = newInfo.id;

        this.edges = this.edges.map(
          (e) =>
            ({
              from: e.from === oldId ? newInfo.id : e.from,
              to: e.to === oldId ? newInfo.id : e.to,
            } as Edge)
        );

        // Update descendants
        // const commonRoot = id.substr(0, level + 1);

        const descendants = this.findAllDescendants(oldId);

        descendants.forEach((desc) => {
          // update vertex id
          const n = toNumber(desc.id.charAt(desc.level));
          const oldDescId = desc.id;
          desc.id = this.generateId(childNode.id, desc.level, n);

          // update
          this.edges = this.edges.map(
            (e) =>
              ({
                from: e.from === oldDescId ? desc.id : e.from,
                to: e.to === oldDescId ? desc.id : e.to,
              } as Edge)
          );
        });
      }
    }

    // Add new sibling to graph
    this.vertex.push(newNode);
    this.edges.push({ from: parentId, to: newNode.id } as Edge);

    this.vertex = this.vertex.sort((a, b) => toNumber(a.id) - toNumber(b.id));
    return this;
  }

  deleteNode(nodeId: string): LogicmodelGraph {
    const node = this.findNode(nodeId);

    if (node) {
      // Remove from graph
      this.vertex = this.vertex.filter((v) => v.id !== nodeId);
      this.edges = this.edges.filter(
        (e) => e.from !== nodeId && e.to !== nodeId
      );

      // Update children ids
      const parentId = this.getParentId(nodeId, node.level);
      const childrenIds = this.findChildrenIds(parentId).sort();

      // Updating vertex and edges
      for (let i = 0; i < childrenIds.length; i++) {
        const oldId = childrenIds[i];

        const childNode = this.findNode(oldId);
        if (childNode) {
          const newId = this.generateId(
            parentId,
            this.getNodeLevel(parentId),
            i
          );
          childNode.id = newId;

          this.edges = this.edges.map(
            (e) =>
              ({
                from: e.from === oldId ? newId : e.from,
                to: e.to === oldId ? newId : e.to,
              } as Edge)
          );
        }
      }
    }
    return this;
  }
}

// Examples
export const vertexExample: LogicmodelVertex[] = [
  {
    id: "1000",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nulla vel nisi convallis scelerisque sed quis sapien. Morbi gravida ipsum enim, at tempus mauris interdum nec. Suspendisse sit amet quam dapibus, tincidunt eros vitae, varius nunc. Phasellus luctus nisl eu sem pretium, sit amet fringilla odio convallis.",
    level: 0,
  },
  {
    id: "1100",
    text: "",
    level: 1,
  },
  {
    id: "1110",
    text: "",
    level: 2,
  },
  {
    id: "1111",
    text: "Lorem ipsum dolor sit amet. Et quaerat repellat ut deserunt excepturi in voluptatem error. Id quam quasi eos enim dolorum est omnis perspiciatis et accusantium eius id debitis voluptate non itaque dolor et voluptatem quos.",
    level: 3,
  },
  {
    id: "1120",
    text: "Aut consequuntur obcaecati aut soluta saepe ad doloribus praesentium. Et veniam impedit nam quidem aspernatur ea suscipit deserunt.",
    level: 2,
  },
  {
    id: "1121",
    text: "Sed dolorum sunt ea magnam nostrum qui voluptatibus vero sit corporis galisum et cumque eius non enim inventore. ",
    level: 3,
  },
  {
    id: "1200",
    text: "",
    level: 1,
  },
  {
    id: "1210",
    text: "",
    level: 2,
  },
  {
    id: "1211",
    text: "Ut illo voluptatibus aut unde exercitationem ex quam tempore ex quibusdam saepe aut nostrum esse cum alias laboriosam sed corporis mollitia. ",
    level: 3,
  },
  {
    id: "1220",
    text: "Et veniam impedit nam quidem aspernatur ea suscipit deserunt.",
    level: 2,
  },
  {
    id: "1221",
    text: "Ea amet soluta et veniam placeat est dolorum galisum et dolores vero non dolorem ducimus. Est earum itaque qui incidunt eum inventore voluptas id nesciunt dolorem.",
    level: 3,
  },
];

export const edgesExample: Edge[] = [
  // Edges from 1
  { from: "1000", to: "1100" },
  { from: "1000", to: "1200" },

  // Edges from 1.1
  { from: "1100", to: "1110" },
  { from: "1100", to: "1120" },

  // Edges from 1.1.1
  { from: "1110", to: "1111" },
  // Edges from 1.1.2
  { from: "1120", to: "1121" },

  // Edges from 1.2
  { from: "1200", to: "1210" },
  { from: "1200", to: "1220" },

  // Edges from 1.2.1
  { from: "1210", to: "1211" },
  // Edges from 1.2.2
  { from: "1220", to: "1221" },
];

export const logicmodelGraphExample = new LogicmodelGraph(
  vertexExample,
  edgesExample
);
