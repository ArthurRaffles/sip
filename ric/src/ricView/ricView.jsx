import React, {Component} from 'react';
import {RicList} from '../ricList/ricList';
import {RicSelector} from '../ric/ricSelector';
import {api} from '../api/priceService';
import {instrumentApi} from '../api/instrumentService';

export class RicView extends Component {
	constructor(props) {
		// console.warn('ctr', api);
		super(props);
		this.state = {
			rics: [],
			rate: {},
			single: {},
			error: ''
		}

	}

	componentDidMount() {
		console.warn('subscribibng', api.subscribePrice);
		api.subscribePrice('GBPUSD', rate => {
			//console.warn('received price', rate);
			this.setState(prev => ({rate}));
		});
		api.getPrice()
			.then(p => this.setState({single: p}));

		fetch(`http://localhost:8999/instruments`,{
			method: 'GET'
		})
			.then(response => response.json())
			.then(instruments => {
			if (instruments && instruments.length) {
				const newRics = instruments.map(inst => inst.ric);
				console.warn('called back', newRics);

				this.setState({
					rics: newRics
				});
			}
		});
		// instrumentApi.getInstruments()
		// 	.then(instruments => {
		// 		if (instruments && instruments.length) {
		// 			const newRics = instruments.map(inst => inst.ric);
		// 			console.warn('called back', newRics);
		//
		// 			this.setState({
		// 				rics: newRics
		// 			});
		// 		}
		// 	})
		// 	.catch(reason => console.error('err', reason));
	}

	handleDelete = (ric) => {
		console.warn('outer about to delete', this.state.rics, ric)
		this.setState(prevState => {
			const {rics} = prevState;
			console.warn('about to delete', rics, ric)
			return {
				rics: rics.filter(ricItem => ricItem !== ric)
			};
		});
	}

	handleSave = (ric) => {
		console.warn('about to save', this.state.rics, ric)

		this.setState(prevState => ({
			rics: [...prevState.rics, ric]
		}));
	}

	handleSaveAll = () => {
		const {rics} = this.state;
		instrumentApi.saveInstruments(rics)
			.then(resp => this.setState({error: ''}))
			.catch(err => {
				console.error('insaveInstrument ', err);
				this.setState({error: err.error})
			});
	}

	render() {
		const {rics = [], rate, single} = this.state;
		console.warn('about to render price', rics, rate, single);
		return (
			<div>
				<div id='single'>{single.ccyPair}: {single.price}</div>
				<div id='price'>{rate.price}: {rate.ccyPair}</div>
				<RicSelector onSave={this.handleSave}/>
				<RicList rics={rics} onDelete={(ric) => this.handleDelete(ric)}/>
				<button id='saveAll' onClick={this.handleSaveAll}>Save All</button>
			</div>
		);
	}
}
