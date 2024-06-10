"use client"
import * as React from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import {Seat} from "@/components/Seat";


type RowType = {
    id: number | string,
    x: number | string,
    y: number | string,
    numberOfSeats: number,
    width: number,
    height: number,
    path: string
}
const initSeatRows = [
    {
        id: "vip",
        x: 0,
        y: 60,
        numberOfSeats: 4,
        width: 200,
        height: 50,
        path: "M 10 10, Q 100 10, 190 10"
    },
    {
        id: 1,
        x: 0,
        y: 80,
        numberOfSeats: 8,
        width: 400,
        height: 100,
        path: "M 10 10, Q 200 70, 390 10"
    },
    {
        id: 2,
        x: 0,
        y: 120,
        numberOfSeats: 10,
        width: 400,
        height: 100,
        path: "M 10 10, Q 200 70, 390 10"
    },
    {
        id: 3,
        x: 0,
        y: 200,
        numberOfSeats: 10,
        width: 400,
        height: 100,
        path: "M 10 10, Q 200 70, 390 10"
    },
    {
        id: 4,
        x: 0,
        y: 240,
        numberOfSeats: 10,
        width: 400,
        height: 100,
        path: "M 10 10, Q 200 70, 390 10"
    },

]

const Rows = ({
                  row,
                  selectedSeats,
                  onSeatClick
              }: {
    row: RowType
    selectedSeats: string[]
    onSeatClick: (seat: string) => void
}) => {

    const [points, setPoints] = useState<Array<{
        x: number,
        y: number,
        angle: number
    }>>([])
    const ref = useRef<SVGPathElement>(null)
    useEffect(() => {
        if (ref.current) {
            const path = ref.current
            const numberOfSeats = row.numberOfSeats
            const length = path.getTotalLength()
            const points = []
            for (let i = 0; i < numberOfSeats; i++) {
                const point = path.getPointAtLength((length / numberOfSeats * i) + (length / numberOfSeats / 2) - 10);
                const point2 = path.getPointAtLength((length / numberOfSeats * (i + 1)) + (length / numberOfSeats / 2));
                const angle = Math.atan2(point2.y - point.y, point2.x - point.x) * 180 / Math.PI;
                points.push({
                    x: point.x,
                    y: point.y,
                    angle
                });
            }
            setPoints(points)
        }
    }, [row.numberOfSeats])
    return <div
        style={{
            top: row.y,
            left: row.x
        }}
        className={`w-[100%] pointer-events-none absolute`}
    >
        <svg
            pointerEvents={"none"}
            viewBox={`0 0 ${row.width} ${row.height}`} width={row.width} height={row.height}
            key={row.id} className={"w-full"} xmlns="http://www.w3.org/2000/svg">
            <path className={"hidden"} pointerEvents={"none"} ref={ref} d={row.path} stroke="transparent"
                  fill="transparent"/>
            {points.map((point, index) => {
                const id = `${row.id}-${index}`
                return <g
                    onClick={() => {
                        onSeatClick(id)
                    }}
                    pointerEvents={"auto"}
                    transform={`translate(${point.x},${point.y}) rotate(${point.angle})`} key={index}>
                    <Seat className={`text-[20px] ${selectedSeats.includes(id) ? "text-[red]" : "text-gray-400"}`}/>
                </g>
            })}
        </svg>
    </div>
}
export const Hall = () => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [seatRows, setSeatRows] = useState<RowType[]>(initSeatRows)
    const selectedText = useMemo(()=>{
        const arr = selectedSeats.map(seat=>{
            const row = seat.split("-")[0]
            const index = seat.split("-")[1]
            return `${row}排${Number(index)+1}号`
        })
        return arr
    },[selectedSeats])
    const [area, setArea] = useState<string>(JSON.stringify(initSeatRows))

    return <div className={"flex flex-col w-[80vw] gap-[16px]"}>
        <textarea
            className={"h-[200px]"}
            onChange={(e) => {
                try {
                    setArea(e.target.value)
                    const seatRows = JSON.parse(e.target.value)
                    setSeatRows(seatRows)
                } catch (e) {
                    console.error(e)
                }
            }}
            value={area}
        />
        <div className={"w-[80vw] h-[80vw] relative bg-gray-100 rounded-2xl"}>
            {seatRows.map(row => {
                return <Rows
                    onSeatClick={(seat) => {
                        if (selectedSeats.includes(seat)) {
                            setSelectedSeats(selectedSeats.filter(s => s !== seat))
                        } else {
                            setSelectedSeats([...selectedSeats, seat])
                        }
                    }}
                    selectedSeats={selectedSeats}
                    row={row} key={row.id}/>
            })}
        </div>
        <div  className={"h-[100px] overflow-auto"}>
            已选择座位：
            {selectedText.map(
                (text, index) => {
                    return <div key={index} className={"text-[red]"}>{text}</div>
                }
            )}
        </div>

    </div>
}