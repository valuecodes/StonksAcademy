import Card from '@material-ui/core/Card';
import { InputSlider } from '../Other/Sliders';
import ShowMore from '../Other/ShowMore'

export default function ShareExample({header,icon,iconStyle,value,input=null,showMore}){
    return(
        <Card>
            <div className='shareExample'>
                <h2>{header}</h2>
                <div className='companyContainer'
                        style={iconStyle}
                    >
                        {icon}
                </div>
                {input?
                    <>
                    <div className='shareExampleInput'>
                        <label>{input.name}</label>
                        <h3 className='shareExampleNumber'>{(value.number).toFixed(value.toFixed)}{value.format}</h3>                           
                    </div>
                    <InputSlider
                        min={input.min}
                        max={input.max} 
                        step={input.step}
                        value={value.number}     
                        onChange={input.onChange}                
                    />
                    </>:
                    <h3 className='shareExampleNumber'>{value.number.toFixed(value.toFixed)}$</h3>   
                }                    
            </div>
            <ShowMore text={showMore}/>  
        </Card>
    )
}
