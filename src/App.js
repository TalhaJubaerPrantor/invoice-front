import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./App.css";

class App extends Component {
	state = {
		name: "",
		receiptId: 0,
		price1: 0,
		price2: 0,
	};

	handleChange = ({ target: { value, name } }) =>
		this.setState({ [name]: value });

	createDownloadPdf = () => {
		axios
			.post("/create-pdf", this.state)
			.then(() => axios.get("fetch-pdf", { responseType: "blob" }))
			.then((res) => {
				const pdfBlob = new Blob([res.data], { type: "application/pdf" });
				saveAs(pdfBlob, "newPdf.pdf");
			});
	};

	render() {
		return (
			<>
				<div className="App"> <br/><br/>
					<img style={{width:"200px",borderRadius:"10px",border:"2px solid"}} src="shauqh-logo.jpeg"/>
					<h1>Invoice Generator</h1>
					
					<input
						type="text"
						placeholder="Name"
						name="name"
						onChange={this.handleChange}
					/>
					<br/>
					<input
						type="text"
						placeholder="Phone"
						name="receiptId"
						onChange={this.handleChange}
					/>
					<br/>
					<input
						type="text"
						placeholder="Address"
						name="price1"
						onChange={this.handleChange}
					/>
					<br/>
					<input
						type="text"
						placeholder="Price"
						name="price2"
						onChange={this.handleChange}
					/>
					<br/>
					<button style={{height:"30px",width:"300px"}} onClick={this.createDownloadPdf}>Download PDF!</button>
				</div>
				<p style={{textAlign:"center",fontSize:"30px"}}>A product of Shauqh Luxury</p>
			</>
		);
	}
}

export default App;
