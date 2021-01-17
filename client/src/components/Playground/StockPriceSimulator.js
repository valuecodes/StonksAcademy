import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { Line } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import { InputSlider } from '../Other/Sliders';
import { useLocation, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';

const currentYear = new Date().getFullYear()

export default function StockPriceSimulator() {

    const history = useHistory();
    const location = useLocation()

    const [stock,setStock] = useState({
        stockPrice:165,
        eps:8.5,
        annualGrowth:4,
        endOfPeriodPE:20,
    })

    const [chart,setChart]=useState({
        data:{},
        options:{
            responsive:true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    display:false
                }
            },
            scales: {
                yAxes: [{
                    id: 'stockPrice',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                    }
                }, {
                    id: 'stockEps',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        display:false,
                        beginAtZero: true,
                        max:stock.eps*15
                    },
                    gridLines: {
                        display:false
                    }   
                }]
            }
        },
        endPrice:0,
        return:0,
        annualReturn:0,
    })

    useEffect(() => {
        if(location.search){
            let search = location.search.replaceAll('?','').split('/')
            let params = {
                stockPrice:+search[0].split('=')[1],
                eps:+search[1].split('=')[1],
                annualGrowth:+search[2].split('=')[1],
                endOfPeriodPE:+search[3].split('=')[1]
            }
            setStock(params)
        }
    }, [])

    useEffect(() => {
        
        let data = []
        let labels = []
        let epsData = []
        let currentEps = stock.eps
        let growthPercent = (stock.annualGrowth/100)+1
        let currentPE = stock.stockPrice / stock.eps
        let peVariance = stock.endOfPeriodPE - currentPE 
        let endPrice = 0
        let intrinsicValue = 0

        for(var i=0;i<=10;i++){
            let newPrice = currentEps*(currentPE+((peVariance/10)*i))
            let newEps = currentEps*=growthPercent
            labels.push(i+currentYear)
            data.push(newPrice)
            epsData.push(newEps)
            endPrice = newPrice
        }

        let annualReturn = +((((endPrice/stock.stockPrice)**(1/10))-1)*100).toFixed(1)
        intrinsicValue = endPrice / ((1+0.1) ** 10)

        setChart({
            ...chart,
            endPrice:+endPrice.toFixed(1),
            return: +(((endPrice-stock.stockPrice)/stock.stockPrice)*100).toFixed(1),
            annualReturn,
            data:{
                labels,
                datasets:[
                    {
                        label: 'Current Stock Price',
                        data:[stock.stockPrice],
                        backgroundColor:'#4DA5EE',
                        borderColor:'#4DA5EE',
                        pointRadius:8,
                        yAxisID:'stockPrice'
                    },
                    {
                        label: 'Intrinsic Value',
                        data:[intrinsicValue],
                        backgroundColor:'rgba(85, 189, 82,0.6)',
                        borderColor:'rgba(85, 189, 82,1)',
                        pointRadius:8,
                        yAxisID:'stockPrice'
                    },
                    {
                        label: 'Stock Price Estimate',
                        data:data,
                        backgroundColor:'rgba(0,0,0,0)',
                        borderColor:'rgba(77, 165, 238,0.5)',
                        pointRadius:0,
                        yAxisID:'stockPrice'
                    },
                    {
                        label: 'EPS estimate',
                        data:epsData,
                        type: 'bar',
                        backgroundColor:'rgba(82, 103, 122,0.6)',
                        yAxisID:'stockEps',
                    },
                ]
            }
        })
        let path = `/playground/stock-price-simulator/?price=${stock.stockPrice}/?eps=${stock.eps}/?growth=${stock.annualGrowth}/?endpe=${stock.endOfPeriodPE}`
        history.push(path)
    },[stock])

    function changeInputHandler(e,value,name){
        const stockCopy = {...stock}
        stockCopy[name]=+value
        setStock(stockCopy)
    }

    return (
        <div className='sectionGrid3'>
            <Card className='stockPriceInputs'>
                <TextField 
                    onChange={(e,value)=>changeInputHandler(e,e.target.value,'stockPrice')} 
                    label="Current Stock Price"
                    className='numberInput'
                    id="standard-basic" 
                    type="number"
                    name='stockPrice'
                    value={stock.stockPrice}
                />         
                <TextField 
                    onChange={(e,value)=>changeInputHandler(e,e.target.value,'eps')} 
                    label="Current EPS"
                    className='numberInput'
                    id="standard-basic" 
                    type="number"
                    name='eps'
                    value={stock.eps}
                />      
                <div>
                    <TextField 
                        onChange={(e,value)=>changeInputHandler(e,e.target.value,'annualGrowth')} 
                        label="Estimated Growth %"
                        className='numberInput'
                        id="standard-basic" 
                        type="number"
                        name='annualGrowth'
                        value={stock.annualGrowth}
                    />         
                    <InputSlider 
                        onChange={changeInputHandler}
                        value={stock.annualGrowth}
                        max={30}
                        min={-15}
                        step={1}
                        name='annualGrowth'
                        className='shareInputSlider' 
                    />
                </div>   
                <div>
                <TextField 
                    onChange={(e,value)=>changeInputHandler(e,e.target.value,'endOfPeriodPE')} 
                    label="End Of Period PE"
                    className='numberInput'
                    id="standard-basic" 
                    type="number"
                    name='endOfPeriodPE'
                    value={stock.endOfPeriodPE}
                />         
                <InputSlider 
                    onChange={changeInputHandler}
                    value={stock.endOfPeriodPE}
                    max={60}
                    min={1}
                    step={1}
                    name='endOfPeriodPE'
                    className='shareInputSlider' 
                />
                </div>
            </Card>
            <div className='stockPriceSimulatorChart'>            
                <Line data={chart.data} options={chart.options} />
            </div>
            <Card className='stockPriceResults'>
                <h2>Forecast {currentYear+10}</h2>
                <p>Annual Return: </p>
                <h3>{chart.annualReturn}%</h3>
                <p>Share Price {currentYear+10}: </p>
                <h3>{chart.endPrice}</h3>
                <p>Total Return: </p>
                <h3>{chart.return}%</h3>
            </Card>
        </div>
    )
}
