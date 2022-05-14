import React from 'react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        y1: {
            grid: {
                color: 'rgba(117, 117, 117, 0.4)'
            },
            type: 'linear',
            display: true,
            position: 'left',
            reverse: true
        },
        x1: {
            reverse: true
        }
    }
};


export default function MyChart({chartData, chartLabel}) {

    const data = {
        labels: chartData.time.map(item => new Date(item).toLocaleDateString('fa-IR', {
            day: '2-digit',
            year: 'numeric',
            month: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })),
        datasets: [
            {
                label: chartLabel,
                data: chartData.data,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                yAxisID: 'y1',
            }
        ]
    };


    return (<tr className="chart">
        <td id="chart" colSpan={5}>
            <div className="chart">
                <Line options={options} data={data}/>
            </div>
        </td>
    </tr>);

}


