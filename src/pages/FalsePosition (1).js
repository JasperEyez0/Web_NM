import { render } from "@testing-library/react";
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Chart,Series} from 'devextreme-react/chart';
import axios from 'axios'

const Parser = require('expr-eval').Parser;
const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
class Linear extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {XL:'',XR:'',ErrorApox:'',func:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
        this.apiinput = this.apiinput.bind(this)
    }

    FalsePositionCalcFunction(XL,XR,ErrorApox,Funct){
        const parser = new Parser();
        function fx(x)
        {
            let expr = parser.parse(Funct)
            console.log("fx = "+expr.evaluate({ x: (x) }))
            return expr.evaluate({ x: (x) })
        }
        var arr = [];
        var i = 0;
        var xl = parseFloat(XL);
        var xr = parseFloat(XR);
        var xm,xold;
        var ErrorApox_Answer=10000000; //set as default
        var inputerrorapox = parseFloat(ErrorApox)
        if(xl!=null && xr!=null && Funct!=null && inputerrorapox!=null){
          while(ErrorApox_Answer>inputerrorapox)
            {
                xm=((xl*fx(xr))-(xr*fx(xl)))/(fx(xr)-fx(xl));
                if(fx(xm)*fx(xr)<0)
                {
                    xold=xl
                    xl=xm
                }
                if(fx(xm)*fx(xr)>0)
                {
                    xold=xr
                    xr=xm
                }
                ErrorApox_Answer = Math.abs((xm-xold)/xm)*100
            i++
            console.log("XL = "+xl)   //console log for debugging
            console.log("XM = "+xm)
            console.log("XR = "+xr)
            console.log("Errorapox = "+ErrorApox_Answer)
            arr.push({xl : xl , xm : xm , xr : xr , error : ErrorApox_Answer , iteration : i});
            // render("XM = "+xm.toFixed(6)+" Errorapox = "+ErrorApox_Answer.toFixed(6)+" at iteration #"+i)
          }
          render(
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Iteration</TableCell>
                    <TableCell align="right">XL</TableCell>
                    <TableCell align="right">XR</TableCell>
                    <TableCell align="right">XM</TableCell>
                    <TableCell align="right">ErrorApox</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arr.map((arr) => (
                    <TableRow
                      key={arr.i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {arr.iteration}
                      </TableCell>
                      <TableCell align="right">{arr.xl}</TableCell>
                      <TableCell align="right">{arr.xr}</TableCell>
                      <TableCell align="right">{arr.xm}</TableCell>
                      <TableCell align="right">{arr.error}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
          return (
            <Chart palette="Violet" dataSource={arr} >
              <Series
                argumentField="iteration" //x
                valueField="error" //y
                name = "Error"
                type = "spline"
                color = "red"
                >
              </Series>
            </Chart>
          )
      }
       else {
        return <span>"Input XL,XR,ErrorApox and Function first!!"</span>
       }
    }


    handleSubmit(event){
        const {XL,XR,ErrorApox,Funct} = this.state
       
        const xm = this.FalsePositionCalcFunction(XL,XR,ErrorApox,Funct)
        event.preventDefault()
        console.log("XL = "+XL)   //console log for debugging
        console.log("XR = "+XR)
        console.log("Function = "+Funct)
        console.log("Errorapox = "+ErrorApox)
         render(xm) //same here at line 53 i literally stuck at re-rendering
    }
    handleChange(event)
    {this.setState({
        [event.target.name] : event.target.value
        })
    }
    apiinput(){
      axios.get('http://localhost:3000/Linear').then(res => {
        const data = res.data
        console.log(data)
        this.setState({XL : res.data[0].XL})
        this.setState({XR : res.data[0].XR})
        this.setState({ErrorApox : res.data[0].ErrorApox})
        this.setState({func : res.data[0].func})
      });
    }
    render(){
        return(
        <div>
          <form >
            <div>
                <h1>&emsp;False-position Method&emsp;</h1>
              <label htmlFor='XL'>&emsp;XL :&emsp;</label>
              <input
                name='XL'
                placeholder='Starting XL'
                value = {this.state.XL}
                onChange={this.handleChange}
                size='8'
              />
              <label htmlFor='XR'>&emsp;XR :&emsp;</label>
              <input
                name='XR'
                placeholder='Starting XR'
                value={this.state.XR}
                onChange={this.handleChange}
                size='8'
              />
              <label htmlFor='ErrorApox'>&emsp;ErrorApox :&emsp;</label>
              <input
                name='ErrorApox'
                placeholder='ErrorApox'
                value={this.state.ErrorApox}
                onChange={this.handleChange}
                size='5'
              />
              </div>
              <p></p>
              <div>
              <label htmlFor='Funct'>&emsp;Funct :&emsp;</label>
              <input
                name='Funct'
                placeholder='Input function here!'
                value={this.state.Funct}
                onChange={this.handleChange}
                size='30'
              />
            </div>
            <p></p>
            <div>
            <button onClick={this.handleSubmit} >Calculate</button>
            </div>
          </form>
          <button onClick={this.apiinput} >API</button>
        </div>
          
        )
      }
    }
export default Linear