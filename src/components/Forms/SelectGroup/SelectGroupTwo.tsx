import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import departamentos from '../../../data/departamentos.json';

interface SelectGroupTwoProps {
  setSelectedOption: (option: number) => void; // Cambiar a number para pasar el id
  disabled?: boolean;
}

const SelectGroupTwo: React.FC<SelectGroupTwoProps> = ({ setSelectedOption, disabled }) => {
  const [selectedOption, setSelectedOptionState] = useState<number>(0);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value); // Convertir a number
    setSelectedOptionState(value);
    setSelectedOption(value); // Pasar el id como número al componente padre
    setIsOptionSelected(true); // Cambiar color de texto al seleccionar una opción
  };

  return (
    <div className='mt-6'>
      <label className="mb-3 block text-black dark:text-white">
        Seleccione el Origen
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
          <FontAwesomeIcon icon={faEarthAmericas} />
        </span>

        <select
          value={selectedOption !== 0 ? selectedOption : ""} // Si no se ha seleccionado, mostrar ""
          onChange={handleChange}
          disabled={disabled}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Seleccione el Departamento
          </option>
          {departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.id} className="text-body dark:text-bodydark">
              {departamento.departamento}
            </option>
          ))}
        </select>

        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroupTwo;
