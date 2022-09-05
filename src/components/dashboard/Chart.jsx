import React from 'react'
import { Line } from 'react-chartjs-2'

const data = {
  labels: ['1396', '1397', '1398', '1399', '1400'],
  datasets: [
    {
      label: '# of Votes',
      lineTension: 0.4,
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
      fill: true, // 3: no fill
    },
  ],
}

const options = {
  plugins: {
    filler: {
      propagate: true,
    },
  },
}

const Chart = () => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  )
}

export default Chart
