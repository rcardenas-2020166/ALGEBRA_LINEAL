import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

type TreeNode = {
  value: string;
  left?: TreeNode;
  right?: TreeNode;
};

// Creamos un árbol simple
const tree: TreeNode = {
  value: "A",
  left: {
    value: "B",
    left: { value: "D" },
    right: { value: "E" },
  },
  right: {
    value: "C",
    left: { value: "F" },
    right: { value: "G" },
  },
};

const FormLayoutTwo: React.FC = () => {
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [traversalNodes, setTraversalNodes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Control de índice actual

  // Funciones de recorrido
  const preOrder = (node: TreeNode | undefined, result: string[] = []) => {
    if (!node) return result;
    result.push(node.value); // Raíz
    preOrder(node.left, result); // Izquierda
    preOrder(node.right, result); // Derecha
    return result;
  };

  const inOrder = (node: TreeNode | undefined, result: string[] = []) => {
    if (!node) return result;
    inOrder(node.left, result); // Izquierda
    result.push(node.value); // Raíz
    inOrder(node.right, result); // Derecha
    return result;
  };

  const postOrder = (node: TreeNode | undefined, result: string[] = []) => {
    if (!node) return result;
    postOrder(node.left, result); // Izquierda
    postOrder(node.right, result); // Derecha
    result.push(node.value); // Raíz
    return result;
  };

  const levelOrder = (node: TreeNode | undefined) => {
    if (!node) return [];
    const queue: TreeNode[] = [node];
    const result: string[] = [];

    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        result.push(current.value); // Agregamos el nodo actual al resultado
        if (current.left) queue.push(current.left); // Agregamos el hijo izquierdo a la cola
        if (current.right) queue.push(current.right); // Agregamos el hijo derecho a la cola
      }
    }
    return result;
  };

  const handleTraversal = (type: "pre" | "in" | "post" | "level") => {
    let result: string[] = [];
    if (type === "pre") result = preOrder(tree);
    if (type === "in") result = inOrder(tree);
    if (type === "post") result = postOrder(tree);
    if (type === "level") result = levelOrder(tree);

    // Reiniciar el estado de resaltado y almacenar nodos
    setHighlightedNodes([result[0]]); // Limpiar nodos resaltados y agregar el primer nodo
    setTraversalNodes(result); // Almacenar todos los nodos para resaltar
    setCurrentIndex(1); // Inicializar el índice en 1 para el siguiente nodo
  };

  // Efecto para resaltar nodos uno a uno
  useEffect(() => {
    if (traversalNodes.length === 0 || currentIndex >= traversalNodes.length) return;

    const interval = setInterval(() => {
      setHighlightedNodes((prev) => [...prev, traversalNodes[currentIndex]]); // Resaltamos el nodo actual
      setCurrentIndex((prev) => prev + 1); // Incrementamos el índice para el siguiente nodo

      // Verificamos si hemos alcanzado el final
      if (currentIndex + 1 >= traversalNodes.length) {
        clearInterval(interval);
      }
    }, 1000); // Intervalo de 1000 ms para resaltar cada nodo

    return () => clearInterval(interval);
  }, [traversalNodes, currentIndex]); // Agregamos currentIndex a las dependencias

  const TreeNodeComponent = ({ node }: { node: TreeNode }) => {
    const isHighlighted = highlightedNodes.includes(node.value);

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: isHighlighted ? "orange" : "lightgray",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          {node.value}
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {node.left && <TreeNodeComponent node={node.left} />}
          {node.right && <TreeNodeComponent node={node.right} />}
        </div>
      </div>
    );
  };

  return (

    <>
    <Breadcrumb pageName="Recorrido de un Árbol" />

    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Opciones del Recorrido
            </h3>
          </div>
            <div className="p-6.5">
            <button
              className={`mt-3 flex w-full justify-center rounded bg-green-600 p-3 font-medium text-white hover:bg-opacity-90`}
              onClick={() => handleTraversal("pre")}>Preorden</button>
            <button 
              className={`mt-3 flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90`}
              onClick={() => handleTraversal("in")}>Inorden</button>
            <button
              className={`mt-3 flex w-full justify-center rounded bg-purple-600 p-3 font-medium text-white hover:bg-opacity-90`} 
              onClick={() => handleTraversal("post")}>Postorden</button>
            <button
              className={`mt-3 flex w-full justify-center rounded bg-teal-600 p-3 font-medium text-white hover:bg-opacity-90`}
              onClick={() => handleTraversal("level")}>Por Nivel</button>

         
            </div>
        </div>
      </div>

      <div className="flex flex-col gap-9 h-35">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Mapa del Recorrido - Visualización
            </h3>
          </div>
          <div className="flex justify-center items-center p-4">
            <TreeNodeComponent node={tree} />

          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default FormLayoutTwo;
