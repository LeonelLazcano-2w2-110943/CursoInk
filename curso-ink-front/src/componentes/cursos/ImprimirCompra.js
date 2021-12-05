import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import ReactToPrint from "react-to-print";
import style from '../Tool/Style';
import { ReciboCompra } from './ReciboCompra';


class ImprimirCompra extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Grid align="center" style={{ margin: "3% 3%" }}>
                    <ReactToPrint
                        trigger={() => {
                            return <Button variant="contained" color="primary">Imprimir</Button>;
                        }}
                        content={() => this.componentRef}
                    />
                </Grid>
                <Grid style={style.titulos}>
                    <Typography align="center" component="h1" variant="h3">Recibo de compra</Typography>
                </Grid>
                <ReciboCompra ref={el => (this.componentRef = el)} compra={this.props.location} />
            </Container>
        )
    }
}

export default ImprimirCompra;
