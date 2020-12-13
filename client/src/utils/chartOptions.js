export const lineChartOptions = {
    responsive:true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                max:20000,
                min:-20000,
                autoSkip: true, 
                maxTicksLimit: 5
            }
        }],
        xAxes:[{
            ticks:{
                autoSkip: true, 
                maxTicksLimit: 5,
                maxRotation: 0,
                minRotation: 0
            }
        }]
    },
    tooltips: {
      enabled: false,
    },
    plugins: {
        datalabels: {
            display:false
        }
      }
  };

export const assetChartOptions = (stacked) => {
    return{
        responsive:true,
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin:0,
                        suggestedMax :20000
                    },
                    gridLines: {
                        // display:false
                    },
                    stacked: stacked
            }],
            xAxes: [{
                gridLines: {
                    display:false
                },
                // offset: true,
            }],
        },
        plugins: {
            datalabels: {
                display:false
            }
        }
  }
} 