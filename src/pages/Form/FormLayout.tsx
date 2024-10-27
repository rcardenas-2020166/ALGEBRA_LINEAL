import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import SelectGroupThree from '../../components/Forms/SelectGroup/SelectGroupThree';
import LogoIcon from '../../images/maps/mapa.jpeg';
import { useState, useRef } from 'react';
import DatosGraficos from '../../models/datosGraficos';
import PintarDibujos from '../../models/pintarDibujos';
import AlgoritmoDijkstra from '../../models/algoritmoDijkstra';
import { toast } from 'react-toastify';

const FormLayout = () => {
  const [origen, setOrigen] = useState<number>(0);
  const [destino, setDestino] = useState<number>(0);
  const [isSelectEnabled, setIsSelectEnabled] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let arboles = new DatosGraficos(); // Instancia de DatosGraficos

  const inicializarDatos = () => {

    const Matriz: number[][] = [
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const coe: number[][] = [
      [0, 57.4, 0, 0, 147, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [57.4, 0, 0, 0, 0, 69.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 55.6, 0, 0, 0, 0, 0, 0, 26.4, 0, 0, 85.1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71.8, 0, 0, 0, 0, 0, 0, 0, 0, 26],
      [147, 0, 0, 0, 0, 0, 0, 0, 0, 0, 327.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 69.1, 0, 0, 0, 0, 0, 0, 93.3, 0, 0, 86.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71.3],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 61.7, 0, 0, 0, 0, 0, 0, 42.7, 0, 85.5, 0, 95.3, 0, 0],
      [0, 0, 55.6, 0, 0, 93.3, 0, 61.7, 0, 0, 0, 0, 0, 0, 0, 45.7, 0, 82.3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 0, 0, 0, 86, 0],
      [0, 0, 0, 0, 327.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 116.7],
      [0, 0, 0, 0, 0, 86.5, 0, 0, 0, 0, 0, 0, 56.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 71.8, 0, 0, 0, 0, 0, 0, 0, 56.1, 0, 0, 0, 0, 0, 70.5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86.9, 0, 50.6, 0, 76.3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86.9, 0, 0, 0, 0, 0, 54.9, 0, 0],
      [0, 0, 26, 0, 0, 0, 0, 42.7, 45.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 0, 0, 0, 50.6, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 85.5, 82.3, 0, 0, 0, 70.5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 85.1, 0, 0, 0, 158, 0, 0, 0, 0, 0, 0, 76.3, 0, 0, 0, 0, 0, 0, 53.7, 0],
      [0, 0, 0, 0, 0, 0, 0, 95.3, 0, 0, 0, 0, 0, 0, 54.9, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 53.7, 0, 0, 0],
      [0, 0, 0, 26, 0, 71.3, 0, 0, 0, 0, 116.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    
    const xx1: number[] = [150, 142, 104, 200, 175, 155, 95, 95, 125, 62, 225, 170, 175,  55, 40, 115, 40, 140,  80,  65,  70, 200];
    const yy1: number[] = [ 75,  95, 108, 108,  35, 100, 75,  125, 109,  70,  80, 110, 124, 105, 120, 113, 95, 125, 108, 120, 100,  95];
    const nom: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];

    for (let j = 0; j < 22; j++) {
      arboles.setCordeX(j, xx1[j]);
      arboles.setCordeY(j, yy1[j]);
      arboles.setNombre(j, nom[j]);
    }

    for (let j = 0; j < 22; j++) {
      for (let k = 0; k < 22; k++) {
        arboles.setmAdyacencia(j, k, Matriz[j][k]);
        arboles.setmCoeficiente(j, k, coe[j][k]);
      }
  }
    pintarFiguras(22, arboles);
  };

  const pintarFiguras = (tope: number, arboles: DatosGraficos) => { // Recibe el número de nodos y el objeto arboles
    if (canvasRef.current) {
      
      const ctx = canvasRef.current.getContext('2d', { alpha: true });
      
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let j = 0; j < tope; j++) {
          for (let k = 0; k < tope; k++) {
            if (arboles.getmAdyacencia(j, k) === 1) {
              PintarDibujos.pintaLinea(ctx, arboles.getCordeX(j), arboles.getCordeY(j), arboles.getCordeX(k), arboles.getCordeY(k), arboles.getmCoeficiente(j, k));
            }
          }
        }
        for (let j = 0; j < tope; j++) {
          const x = arboles.getCordeX(j);
          const y = arboles.getCordeY(j);
          const nombre = arboles.getNombre(j);
          PintarDibujos.pintaCirculo(ctx, x, y, nombre);
      }
      
      }
    }
  };



  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(origen && destino){
      if(origen === destino){
        toast.warning('El Origen y el Destino deben ser distintos.', {
          autoClose: 3000,
          className: "dark:bg-boxdark dark:text-white"
        })      
      }else
      {
        const context = canvasRef.current?.getContext('2d');

        if (context && canvasRef.current) 
        {
            const Matriz: number[][] = [
              [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
              [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
              [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
              [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
              [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
        
            const coe: number[][] = [
              [0, 57.4, 0, 0, 147, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [57.4, 0, 0, 0, 0, 69.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 55.6, 0, 0, 0, 0, 0, 0, 26.4, 0, 0, 85.1, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71.8, 0, 0, 0, 0, 0, 0, 0, 0, 26],
              [147, 0, 0, 0, 0, 0, 0, 0, 0, 0, 327.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 69.1, 0, 0, 0, 0, 0, 0, 93.3, 0, 0, 86.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71.3],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 61.7, 0, 0, 0, 0, 0, 0, 42.7, 0, 85.5, 0, 95.3, 0, 0],
              [0, 0, 55.6, 0, 0, 93.3, 0, 61.7, 0, 0, 0, 0, 0, 0, 0, 45.7, 0, 82.3, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 0, 0, 0, 86, 0],
              [0, 0, 0, 0, 327.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 116.7],
              [0, 0, 0, 0, 0, 86.5, 0, 0, 0, 0, 0, 0, 56.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 71.8, 0, 0, 0, 0, 0, 0, 0, 56.1, 0, 0, 0, 0, 0, 70.5, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86.9, 0, 50.6, 0, 76.3, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86.9, 0, 0, 0, 0, 0, 54.9, 0, 0],
              [0, 0, 26, 0, 0, 0, 0, 42.7, 45.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 0, 0, 0, 50.6, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 85.5, 82.3, 0, 0, 0, 70.5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 85.1, 0, 0, 0, 158, 0, 0, 0, 0, 0, 0, 76.3, 0, 0, 0, 0, 0, 0, 53.7, 0],
              [0, 0, 0, 0, 0, 0, 0, 95.3, 0, 0, 0, 0, 0, 0, 54.9, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 53.7, 0, 0, 0],
              [0, 0, 0, 26, 0, 71.3, 0, 0, 0, 0, 116.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            
            const xx1: number[] = [150, 142, 104, 200, 175, 155, 95, 95, 125, 62, 225, 170, 175,  55, 40, 115, 40, 140,  80,  65,  70, 200];
            const yy1: number[] = [ 75,  95, 108, 108,  35, 100, 75,  125, 109,  70,  80, 110, 124, 105, 120, 113, 95, 125, 108, 120, 100,  95];
            const nom: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
        
            for (let j = 0; j < 22; j++) {
              arboles.setCordeX(j, xx1[j]);
              arboles.setCordeY(j, yy1[j]);
              arboles.setNombre(j, nom[j]);
            }
        
            for (let j = 0; j < 22; j++) {
              for (let k = 0; k < 22; k++) {
                arboles.setmAdyacencia(j, k, Matriz[j][k]);
                arboles.setmCoeficiente(j, k, coe[j][k]);
              }
          }
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const dijkstra = new AlgoritmoDijkstra(arboles, 22, (origen -1), (destino -1), context);
            dijkstra.dijkstra();
        } else {
            console.error("No se pudo obtener el contexto del canvas.");
        }
        
      }
    }
  };

  const handleShowPaths = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSelectEnabled(true);
    // setIsButtonDisabled(true);
    inicializarDatos();
  };


  return (
    <>
      <Breadcrumb pageName="Algoritmo de Dijkstra - Matrices y Vectores 2D" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Búsqueda de Rutas
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <SelectGroupTwo setSelectedOption={setOrigen} disabled={!isSelectEnabled} />
                <SelectGroupThree setSelectedOption={setDestino} disabled={!isSelectEnabled} />

                <button
                  onClick={handleShowPaths}
                  disabled={isButtonDisabled}
                  className={`mt-9 flex w-full justify-center rounded bg-green-600 p-3 font-medium text-white hover:bg-opacity-90 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Mostrar Caminos
                </button>

                <button
                  onClick={handleSearch}
                  disabled={!origen || !destino}
                  className={`mt-3 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 ${(!origen || !destino) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Buscar Camino Más Corto
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Mapa del Recorrido
              </h3>
            </div>
            <div className="flex justify-center items-center p-4 relative">
              <img
                src={LogoIcon}
                alt="Logo"
                className="w-125 h-110"
              />
              <canvas
                ref={canvasRef}
                className="absolute  w-125 h-110"
                style={{ width: '100%', height: '100%' }} // Asegúrate de que el canvas ocupe todo el espacio de la imagen
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
