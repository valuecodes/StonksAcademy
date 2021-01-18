import React,{useState,useEffect,useRef} from 'react'
import TextField from '@material-ui/core/TextField';
import { Line } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import { InputSlider } from '../Other/Sliders';
import { useLocation, useHistory } from 'react-router-dom'
import ResultCard from '../Example/ResultCard';
import Divider from '@material-ui/core/Divider';

const currentYear = new Date().getFullYear()

export default function StockPriceSimulator() {

    const history = useHistory();
    const location = useLocation()
    const chartRef = useRef()

    const [stock,setStock] = useState({
        stockPrice:165,
        eps:8.5,
        dividend:5.8,
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
                    },

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
                        display:false,
                        
                    }   
                }],
                xAxes:[
                    {

                    }
                ]
            },
            legend: {
                labels: {
                    filter: function(item, chart) {
                        return ['Stock Price Estimate','Intrinsic Value Estimate','EPS estimate','Dividend Estimate'].includes(item.text)
                    }
                },
                color:'white'
            }
        },
        endPrice:0,
        return:0,
        annualReturn:0,
        currentPE:0,
        intrinsicValue:0,
        divYield:0,
        totalReturn:0,
    })

    useEffect(() => {
        if(location.search){
            let search = location.search.replaceAll('?','').split('/')
            let params = {
                stockPrice:+search[0].split('=')[1],
                eps:+search[1].split('=')[1],
                annualGrowth:+search[2].split('=')[1],
                endOfPeriodPE:+search[3].split('=')[1],
                dividend:+search[4].split('=')[1],
            }
            setStock(params)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        let endValueArray = []
        let dividendArray = []
        let currentDividend = stock.dividend
        let totalDivs = 0
        let divYield = +((stock.dividend / stock.stockPrice)*100).toFixed(1)
        let divYieldPercent = stock.dividend / stock.stockPrice
        
        for(var i=0;i<=10;i++){
            let newPrice = currentEps*(currentPE+((peVariance/10)*i))
            let newEps = currentEps*=growthPercent
            let newDividend = currentDividend*=growthPercent
            labels.push(i+currentYear)
            data.push(newPrice)
            epsData.push(newEps)
            endPrice = newPrice
            endValueArray.push(i===10?+endPrice.toFixed():null)
            dividendArray.push(newPrice+totalDivs)
            totalDivs+=newDividend
        }

        let annualReturn = +((((endPrice/stock.stockPrice)**(1/10))-1)*100).toFixed(1)
        intrinsicValue = +(endPrice / ((1+(0.1-divYieldPercent)) ** 10)).toFixed()

        let intrinsicArray=[]
        let annualReturnArray = []
        let intrinsicReturnArray = []
        let dividendReturnArray = []
        let bottomArray = []

        for(var a=0;a<=10;a++){
            intrinsicArray.push(intrinsicValue*((1+(0.1-divYieldPercent))**a))
            dividendReturnArray.push(a===3?dividendArray[a]:null)
            annualReturnArray.push(a===4?data[a]:null)
            intrinsicReturnArray.push(a===5?intrinsicValue*((1+(0.1-divYieldPercent))**a):null)
            bottomArray.push(0)
        }

        setChart({
            ...chart,
            endPrice:+endPrice.toFixed(1),
            return: +(((endPrice-stock.stockPrice)/stock.stockPrice)*100).toFixed(1),
            currentPE:+currentPE.toFixed(1),
            annualReturn,
            intrinsicValue,
            divYield,
            totalReturn:annualReturn+divYield,
            data:{
                labels,
                datasets:[
                    {
                        label: 'Current Stock Price',
                        data:[stock.stockPrice],
                        backgroundColor:'#4DA5EE',
                        borderColor:'#4DA5EE',
                        pointRadius:8,
                        yAxisID:'stockPrice',
                        datalabels : {
                            align	: 'right',
                            anchor : intrinsicValue>stock.stockPrice?'start':'end',
                            display: true,                        
                            formatter: function(value, context) {
                                return 'Current Price '+value;
                            },
                            backgroundColor: function(context) {
                                return context.dataset.backgroundColor;
                            },
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    {
                        label: 'Price estimate',
                        data:endValueArray,
                        backgroundColor:'rgb(226, 226, 226)',
                        // borderColor:'rgba(107, 128, 148,1)',
                        borderColor:'#4DA5EE',
                        pointBorderWidth:2,
                        pointRadius:15,
                        yAxisID:'stockPrice',
                        datalabels : {
                            align	: 'center',
                            anchor : 'center',
                            display: true,
                            formatter: function(value, context) {
                                return `${value}`;
                            },
                            backgroundColor: function(context) {
                                return context.dataset.backgroundColor;
                            },
                            borderRadius: '50%',
                            border:10,
                            color: 'rgb(88, 88, 88)',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    {
                        label: 'Annual Return percent',
                        data:annualReturnArray,
                        backgroundColor:'#4DA5EE',
                        borderColor:'#4DA5EE',
                        pointRadius:8,
                        yAxisID:'stockPrice',
                        datalabels : {
                            align	: 'center',
                            anchor : 'center',
                            display: true,
                            formatter: function(value, context) {
                                return `${annualReturn}% p.a.`;
                            },
                            backgroundColor: function(context) {
                                return context.dataset.backgroundColor;
                            },
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    {
                        label: 'Intrinsic Return percent',
                        data:intrinsicReturnArray,
                        backgroundColor:'rgba(85, 189, 82,1)',
                        borderColor:'rgba(85, 189, 82,1)',
                        pointRadius:8,
                        yAxisID:'stockPrice',
                        datalabels : {
                            align	: 'center',
                            anchor : 'center',
                            display: true,
                            formatter: function(value, context) {
                                return `${10}% p.a.`;
                            },
                            backgroundColor: function(context) {
                                return context.dataset.backgroundColor;
                            },
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    {
                        label: 'Dividend Return percent',
                        data:dividendReturnArray,
                        backgroundColor:'rgba(242, 245, 59,1)',
                        borderColor:'rgba(242, 245, 59,1)',
                        pointRadius:8,
                        yAxisID:'stockPrice',
                        datalabels : {
                            align	: 'center',
                            anchor : 'center',
                            display: true,
                            formatter: function(value, context) {
                                return `${divYield}% p.a.`;
                            },
                            backgroundColor: function(context) {
                                return context.dataset.backgroundColor;
                            },
                            borderRadius: 4,
                            color: 'rgb(88, 88, 88)',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    {
                        label: 'Intrinsic Value',
                        data:[intrinsicValue],
                        backgroundColor:'rgba(85, 189, 82,1)',
                        borderColor:'rgba(85, 189, 82,1)',
                        pointRadius:8,
                        yAxisID:'stockPrice',
                        datalabels : {
                            align	: 'right',
                            anchor : intrinsicValue<stock.stockPrice?'start':'end',
                            display: true,
                            formatter: function(value, context) {
                                return 'Intrinsic Value '+value;
                            },
                            backgroundColor: function(context) {
                                return context.dataset.backgroundColor;
                            },
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    {
                        label: 'Bottom price',
                        data:bottomArray,
                        backgroundColor:'rgba(77, 165, 238,0)',
                        borderColor:'rgba(77, 165, 238,0)',
                        pointRadius:0,
                        yAxisID:'stockPrice',
                        fill: '-1',
                    },
                    {
                        label: 'Stock Price Estimate',
                        data:data,
                        backgroundColor:'rgba(77, 165, 238,0.2)',
                        borderColor:'rgba(77, 165, 238,0.5)',
                        pointRadius:0,
                        yAxisID:'stockPrice',
                        fill: '-1',
                    },
                    {
                        label: 'Dividend Estimate',
                        data:dividendArray,
                        backgroundColor:'rgba(242, 245, 59,0.3)',
                        borderColor:'rgba(242, 245, 59,1)',
                        pointRadius:0,
                        yAxisID:'stockPrice',
                        fill: '-1',
                    },
                    {
                        label: 'Intrinsic Value Estimate',
                        data:intrinsicArray,
                        backgroundColor:'rgba(0,0,0,0)',
                        borderColor:'rgba(85, 189, 82,1)',
                        pointRadius:0,
                        yAxisID:'stockPrice'
                    },
                    {
                        label: 'EPS estimate',
                        data:epsData,
                        type: 'bar',
                        backgroundColor:'rgba(82, 103, 122,1)',
                        yAxisID:'stockEps',
                    },
                ]
            }
        })
        let path = `/playground/stock-price-simulator/?price=${stock.stockPrice}/?eps=${stock.eps}/?growth=${stock.annualGrowth}/?endpe=${stock.endOfPeriodPE}/?dividend=${stock.dividend}`
        history.push(path)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[stock])

    function changeInputHandler(e,value,name){
        const stockCopy = {...stock}
        stockCopy[name]=+value
        setStock(stockCopy)
    }

    const calculateValuationText = () =>{
        if(chart.totalReturn>7) return 'Undervalued'
        if(chart.totalReturn>3) return 'Fairly Valued'
        if(chart.totalReturn<=3) return 'Overvalued'
    }

    const calculateValuationColor=()=>{
        let text = calculateValuationText()
        if(text==='Undervalued') return'var(--positive-color)'
        if(text==='Fairly Valued') return'var(--neutral-color)'
        if(text==='Overvalued') return'var(--negative-color)'
    }

    return (
        <div className='sectionGrid3'>
            <Card className='stockPriceInputs'>
                <div className='stockPriceStaticInputs'>
                <TextField 
                    onChange={(e,value)=>changeInputHandler(e,e.target.value,'stockPrice')} 
                    label="Stock Price"
                    className='numberInput'
                    id="standard-basic" 
                    type="number"
                    name='stockPrice'
                    value={stock.stockPrice}
                />         
                <TextField 
                    onChange={(e,value)=>changeInputHandler(e,e.target.value,'eps')} 
                    label="EPS"
                    className='numberInput'
                    id="standard-basic" 
                    type="number"
                    name='eps'
                    value={stock.eps}
                /> 
                <TextField 
                    onChange={(e,value)=>changeInputHandler(e,e.target.value,'dividend')} 
                    label="Dividend"
                    className='numberInput'
                    id="standard-basic" 
                    type="number"
                    name='dividend'
                    value={stock.dividend}
                /> 
                <TextField 
                    label="PE"
                    className='numberInput'
                    id="standard-basic" 
                    type="number"
                    name='dividend'
                    value={chart.currentPE}
                    InputProps={{
                        readOnly: true,
                      }}
                /> 
                </div>
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
                    label="Normalized PE"
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
            <Card className='stockPriceSimulatorChart'>            
                <Line ref={chartRef} data={chart.data} options={chart.options} />
            </Card>
            <div className='stockPriceResultsContainer'>
                <Card className='valuationCard' style={{backgroundColor:calculateValuationColor()}}>
                    <h2>{calculateValuationText()}</h2>
                </Card>
                <ResultCard header={'Intrinsic Value'} value={chart.intrinsicValue+'$'}/>
                <Card className='stockPriceResults'>
                    <h2>{currentYear} - {currentYear+10}</h2>
                    <p>Annual Return: </p>
                    <h3>{chart.annualReturn}%</h3>
                    <p>Dividends: </p>
                    <h3>{chart.divYield}%</h3>
                    <Divider className='stockPriceResultsDivider'/>
                    <p>Total: </p>
                    <h3>{chart.totalReturn.toFixed(1)}%</h3>
                </Card>     
            </div>
        </div>
    )
}
