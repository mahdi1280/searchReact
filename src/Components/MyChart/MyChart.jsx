// import React from 'react';
// import {Chart} from 'react-charts'
//
// export default function MyChart({chartData}) {
//     const data = React.useMemo(
//         () => [
//             {
//                 label: 'Series 1',
//                 data:chartData
//             },
//         ],
//         []
//     )
//
//     const axes = React.useMemo(
//         () => [
//             {primary: true, type: 'linear', position: 'bottom'},
//             {type: 'linear', position: 'left'}
//         ],
//         []
//     )
//
//     return (
//         <tr className="chart"><td colSpan={5}>
//             <div className="chart" id="chart">
//                 <Chart dark={true} data={data} axes={axes}/>
//             </div>
//         </td></tr>
//     )
//
//
// }

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Rate Watch Chart',
        },
    },
    scales: {
        y1: {
            type: 'linear' ,
            display: true,
            position: 'left',
            reverse:true
        },
    },
};

const labels = ['1300-01-01 20202', '1300-01-01 20202', '1300-01-01 20202', '1300-01-01 20202', '1300-01-01 20202', '1300-01-01 20202', '1300-01-01 20202'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Rate',
            data: [100,3,2,1],
            borderColor: 'rgb(23,115,218)',
            backgroundColor: 'rgba(1,35,255,0.5)',
            yAxisID: 'y1',
        },
    ],
};

export default function MyChart() {
    return <Line options={options} data={data} />;
}


