import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Clients extends Component {
	static propTypes = {
		prop: PropTypes
	};

	render() {
		const clients = [
			{
				id: 1234,
				firstName: "channu",
				lastName: "BS",
				email: "channucs009@gmail.com",
				phone: "9980972009",
				balance: "50"
			},
			{
				id: 4444,
				firstName: "abhi",
				lastName: "Bellary",
				email: "abhi@gmail.com",
				phone: "994572009",
				balance: "50"
			}
		];

		if (clients) {
			return (
				<div>
					<div className="row">
						<div className="col-md-6">
							<h2>
								{" "}
								<i className="fas fa-users" /> Clients {""}
							</h2>
						</div>
						<div className="col-md-6"></div>
					</div>

					<table className="table table-striped">
						<thead className="thead-inverse">
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>balance</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{clients.map(client => (
								<tr key={client.id}>
									<td>
										{client.firstName} {client.lastName}
									</td>
									<td>{client.email}</td>
									<td>${parseFloat(client.balance).toFixed(2)}</td>
									<td>
										<Link
											to={`/client/${client.id}`}
											className="btn btn-secondary btn-sm"
										>
											<i className="fas fa-arrow-circle-right" /> Details
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		} else {
			return <h1>Loading</h1>;
		}
	}
}
export default Clients;
