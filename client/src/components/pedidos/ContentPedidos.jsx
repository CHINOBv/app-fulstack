import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export class ContentPedidos extends React.Component {


	render() {
		return (
			<div>
				<h1>Pedidos</h1>
				<Select 
					options={options}
					isMulti={true}
					components={makeAnimated()}
					placeholder="Seleccionar Productos"
				/>
			</div>
		)
	}
}

export default ContentPedidos