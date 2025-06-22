// src/components/map/GlobalWeatherTimeSelector.tsx

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWeatherDatetime } from '../../reducers/weather'
import styled from 'styled-components'

const ToggleButton = styled.button`
  position: fixed;
  right: 10px;
  top: 170px;

  background: #3498db;
  color: #fff;
  font-size: 24px;
  border: none;
  border-radius: 20%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
`

const Container = styled.div`
  position: fixed;
  top: 170px;
  right: 20px;

  @media (max-width: 600px) {
    top: 170px;
    right: 60px;
  }

  background: #fff;
  padding: 12px;
  border-radius: 16px;
  font-size: 13px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  z-index: 1000;
  width: fit-content;
  text-align: center;
`

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
`

const Title = styled.div`
  margin-bottom: 8px;
  font-weight: bold;
`

const Row = styled.div`
  margin-bottom: 8px;
  &:last-child { margin-bottom: 0; }
  display: flex;
  align-items: center;
  justify-content: center;
`

const Label = styled.label`
  margin-right: 8px;
`

const DateInput = styled.input`
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
`

const HourSelect = styled.select`
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
`

export default function GlobalWeatherTimeSelector() {
  const dispatch = useDispatch()
  const datetime = useSelector((s: any) => s.weather.datetime)
  const { from, to } = useSelector((s: any) => s.otp.currentQuery)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  if (!from && !to) return null

  const date = datetime.slice(0,10)   // "YYYY-MM-DD"
  const hour = datetime.slice(11,13)  // "HH"

  const onDateChange = (d:string) =>
    dispatch(setWeatherDatetime(`${d}T${hour}:00:00`))
  const onHourChange = (h:string) =>
    dispatch(setWeatherDatetime(`${date}T${h}:00:00`))

  const [Y, M, D] = date.split('-').map(Number)
  const H = Number(hour)
  const targetUtc = Date.UTC(Y, M-1, D, H, 0, 0)
  const nowUtc = Date.now()
  const threshold = 7*60*60*1000
  const isArchive = targetUtc < nowUtc - threshold

  return (
    <>
      {!open && (
        <ToggleButton onClick={() => setOpen(true)}>
          📅
        </ToggleButton>
      )}
      {open && (
        <Container ref={ref}>
          <CloseButton onClick={() => setOpen(false)}>✕</CloseButton>
          <Title>Weather Parameters</Title>
          <Title>
            {isArchive
              ? '📅 Historical weather'
              : '🌤 Forecast weather'}
          </Title>
          <Row>
            <Label htmlFor="weather-date">Date:</Label>
            <DateInput
              id="weather-date"
              type="date"
              value={date}
              onChange={e => onDateChange(e.target.value)}
            />
          </Row>
          <Row>
            <Label htmlFor="weather-time">Time:</Label>
            <HourSelect
              id="weather-time"
              value={hour}
              onChange={e => onHourChange(e.target.value)}
            >
              {Array.from({ length: 24 }, (_, i) => {
                const h = i.toString().padStart(2,'0')
                return <option key={h} value={h}>{h}:00</option>
              })}
            </HourSelect>
          </Row>
        </Container>
      )}
    </>
  )
}
