import React from 'react'
import { Chart } from 'react-charts'
 
export default function UserChart() {
    //Poate fi folosit pentru departamente, sa se compare in fiecare luna
  const data = React.useMemo(
    () => [
      { // Albastru
        //Se poate face pentru fiecare membru al departamentului in parte
        //si categoriile mari sa fie reprezentate de departamente
        label: 'Andrei', //Numele coloanei
        data: [["Asdf", 1], [1, 2], [2, 4], [3, 2], [4, 7]] //Numele categoriei
        //le-om organiza o tara diferit, in sensul ca in data va fi numele lunii / departamentului
        //si la label numele lui
      },
      {
          //Rosu
        label: 'Series 2',
        data: [["Asdf", 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      },
      {
        //Rosu
      label: 'Series 3',
      data: [["Asdf", 9], [1, 1], [2, 5], [3, 6], [4, 4]]
    }
    ],
    []
  )

  const tooltip = React.useMemo(
    () => ({
      render: ({ datum, primaryAxis, getStyle }) => {
        return <CustomTooltip {...{ getStyle, primaryAxis, datum }} />
      }
    }),
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: false }
    ],
    []
  )

  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )
 
  return (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} series={series} tooltip={tooltip} primaryCursor />
    </div>
  )
}

function CustomTooltip({ getStyle, primaryAxis, datum }) {
    const data = React.useMemo(
      () =>
        datum
          ? [
              {
                data: datum.group.map(d => ({
                  primary: d.series.label,
                  secondary: d.secondary,
                  color: getStyle(d).fill
                }))
              }
            ]
          : [],
      [datum, getStyle]
    )
    return datum ? (
      <div
        style={{
          color: 'white',
          pointerEvents: 'none'
        }}
      >
        <h3
          style={{
            display: 'block',
            textAlign: 'center'
          }}
        >
          {primaryAxis.format(datum.primary)}
        </h3>
        <div
          style={{
            width: '300px',
            height: '200px',
            display: 'flex'
          }}
        >
          <Chart
            data={data}
            dark
            series={{ type: 'bar' }}
            axes={[
              {
                primary: true,
                position: 'bottom',
                type: 'ordinal'
              },
              {
                position: 'left',
                type: 'linear'
              }
            ]}
            getDatumStyle={datum => ({
              color: datum.originalDatum.color
            })}
            primaryCursor={{
              value: datum.seriesLabel
            }}
          />
        </div>
      </div>
    ) : null
}