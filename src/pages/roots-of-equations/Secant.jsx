import React,{ useState } from 'react' // ตัวนี้เป็นฟังชั่น component
import {Chart, Series} from 'devextreme-react/chart';
import { render } from '@testing-library/react';

const Parser = require('expr-eval').Parser; // เเปลง string to ???

const Secant = () => {

    const [Keepvalue,setKeepvalue] = useState ([])
    const [CheckUnValid,setCheckUnValid] = useState (false)
    const [ans,setans] = useState ()
    const [err,seterr] = useState ()
    var arr = []
    const arrG = [{value1: 'error', value2: 'iteration'}]

    const Secant_solve = (X0,Error,Functions,Functionsdiff) => {

        const parser = new Parser();

        function fx(x) {
            let func = parser.parse(Functions)
            return func.evaluate({ x: (x) }) //ส่งค่ากลับไปใช้
        }

        function fxd(x) {
            let funcd = parser.parse(Functionsdiff)
            return funcd.evaluate({ x: (x) }) //ส่งค่ากลับไปใช้
        }

        function delta(x0,x1) {
            let delta = fx(x0)/fxd(x0,x1);
            return delta;
        }

        var x0 = parseFloat(X0); // String to float
        var x1 = x0-(fx(x0)/fxd(x0));
        var xn;
        var Errors = 10000000; //รอบสูงสุด
        var InputError = parseFloat(Error);
        var TempArray = [];
        var i = 0;

        if(x0!=null && Functions!=null && Functionsdiff!=null && InputError!=null)
        {
            while(Errors > InputError)
            {
                xn = x0 - delta(x0,x1);
                Errors = Math.abs(delta(x0,x1)/xn) * 100;
                x0 = x1;
                x1 = xn;
                let Count = [xn.toFixed(6),Errors.toFixed(6)]; // item [0],[1],[2],[3]
                TempArray.push(Count);
                i++;
                arr.push({xn : parseFloat(xn), error : parseFloat(Errors) , iteration : parseFloat(i)})
            }
            setans(xn.toFixed(6));
            seterr(Errors.toFixed(6));
        }
        setKeepvalue(TempArray);
        render(
            <div className="graph" id='graph'>
                    <Chart palette="Violet" dataSource={arr}>
                        {arrG.map((item) =><Series
                            argumentField = {item.value2}
                            valueField = {item.value1}
                            name = "Error"
                            type = "line"
                            color = "#000d6c"
                        />)}
                    </Chart>
            </div>
        )
    }
    const InputNumber = (e) =>
    {
        e.preventDefault()
        let x0 = e.target.X0.value
        let errorer = e.target.Error.value
        let fu = e.target.Function.value
        let fud = e.target.Functiondiff.value

        if(x0 && errorer && fu && fud)
        {
            setCheckUnValid(false); // ถ้ามี
            Secant_solve(x0,errorer,fu,fud);
        }
        else
        {
            setCheckUnValid(true);
        }
    }
    return (
        <div className='box'>
            <div className="title">
                <h1>Secant Method</h1>
            </div>
            <div className="content">
                <div className="input-box">
                    <form onSubmit={InputNumber} className="form">
                        <div className="in">
                            <div className="inbox">
                                    <label> &emsp;X0 :&emsp; </label>
                                    <input name='X0' placeholder='Starting X0'/>
                                    
                                    <label className='text'> &emsp;Error:&emsp; </label>
                                    <input name='Error' placeholder='Epsilon'/>
                            </div>
                            <p></p>
                            <div className="inbox">
                                <label className='text'> &emsp;Function :&emsp; </label>
                                <input name='Function' placeholder='Input function here'/>

                                <label className='text'> &emsp;Function diff :&emsp; </label>
                                <input name='Functiondiff' placeholder='Input function here'/>
                            </div>
                            <p></p>
                        </div>
                        <div className="inbox">
                            <div className="inbox-btn">
                                &emsp;<button id='btn'>Calculate</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="showans">
                    {CheckUnValid && <h4 id="ans">Input X0,Error,Function and Function diff first!</h4>}
                    {!CheckUnValid && <h4 id="ans">The value of root is : {ans}</h4>}
                    {!CheckUnValid && <h4 id="err">Error is : {err}</h4>}
                </div>
                <div className="tb">
                    <table class='table' style = {{
                        border: "1px solid black",
                        textAlign: "center",
                        justifyContent: "center",
                        width: "50vw"
                    }}>
                        <thead bgcolor="#000d6c">
                            <tr>
                                <th style={{border: "1px solid black", color: "white"}}> ITERATION </th>
                                <th style={{border: "1px solid black", color: "white"}}> Xn </th>

                                <th style={{border: "1px solid black", color: "white"}}> ERROR </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!CheckUnValid && Keepvalue.length > 0 && Keepvalue.map((item,index) => {
                                return <tr key={index}>
                                            <td style={{border: "1px solid black"}}>{index}</td>
                                            <td style={{border: "1px solid black"}}>{item[0]}</td>
                                            <td style={{border: "1px solid black"}}>{item[1]}</td>
                                        </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default Secant;