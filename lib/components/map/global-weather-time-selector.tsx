// src/components/GlobalWeatherTimeSelector.tsx

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWeatherDatetime } from '../../reducers/weather'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  background: #fff;
  padding: 8px 10px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: auto;
`

const Row = styled.div`
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.label`
  margin-right: 8px;
`

const DateInput = styled.input`
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 13px;
`

const HourSelect = styled.select`
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 13px;
`

export default function GlobalWeatherTimeSelector() {
  const dispatch = useDispatch()
  const datetime = useSelector((s: any) => s.weather.datetime)

  const date = datetime.slice(0, 10)   // "YYYY-MM-DD"
  const hour = datetime.slice(11, 13)  // "HH"

  const onDateChange = (d: string) =>
    dispatch(setWeatherDatetime(`${d}T${hour}:00:00`))

  const onHourChange = (h: string) =>
    dispatch(setWeatherDatetime(`${date}T${h}:00:00`))

  return (
    <Container>
      <Row>
        <Label>Date:</Label>
        <DateInput
          type="date"
          value={date}
          onChange={e => onDateChange(e.target.value)}
        />
      </Row>
      <Row>
        <Label>Time:</Label>
        <HourSelect
          value={hour}
          onChange={e => onHourChange(e.target.value)}
        >
          {Array.from({ length: 24 }, (_, i) => {
            const h = i.toString().padStart(2, '0')
            return (
              <option key={h} value={h}>
                {h}:00
              </option>
            )
          })}
        </HourSelect>
      </Row>
    </Container>
  )
}