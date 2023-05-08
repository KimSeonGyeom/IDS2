import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useMemo } from 'react'

import { Grid, Slider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { useStore } from '../BasicElements/Store';
import Button from '@mui/material/Button';

const Input = styled(MuiInput)`
  width: 64px;
`;

const posInputProps = {
  step: 10,
  min: 0,
  max: 10000,
  type: 'number',
  'aria-labelledby': 'input-slider',
}

const zoomInputProps = {
  step: 1,
  min: 1,
  max: 200,
  type: 'number',
  'aria-labelledby': 'input-slider',
}

function InsCamera() {
  const camPos = useStore((state) => state.camPos);
  const setCamPos = useStore((state) => state.setCamPos);

  const camZoom = useStore((state) => state.camZoom);
  const setCamZoom = useStore((state) => state.setCamZoom);

  return (
    <>
      <b>Camera</b><br/>
      <Grid container spacing={2} alignItems="center">
        <Grid item> camPosX: &nbsp;
          <Input value={camPos[0]} size="small" inputProps={posInputProps}
            onChange={(e) => { setCamPos([e.target.value, camPos[1], camPos[2]]); }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            value={camPos[0]} min={0} max={2000} step={10} aria-labelledby="input-slider"
            onChange={(e) => { setCamPos([e.target.value, camPos[1], camPos[2]]); }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item> camPosY: &nbsp;
          <Input value={camPos[1]} size="small" inputProps={posInputProps}
            onChange={(e) => { setCamPos([camPos[0], e.target.value, camPos[2]]); }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            value={camPos[1]} min={0} max={2000} step={10} aria-labelledby="input-slider"
            onChange={(e) => { setCamPos([camPos[0], e.target.value, camPos[2]]); }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item> camPosZ: &nbsp;
          <Input value={camPos[2]} size="small" inputProps={posInputProps}
            onChange={(e) => { setCamPos([camPos[0], camPos[1], e.target.value]); }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            value={camPos[2]} min={0} max={2000} step={10} aria-labelledby="input-slider"
            onChange={(e) => { setCamPos([camPos[0], camPos[1], e.target.value]); }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item> camZoom: &nbsp;
          <Input value={camZoom} size="small" inputProps={zoomInputProps}
            onChange={(e) => { setCamZoom(e.target.value); }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            value={camZoom} min={1} max={200} step={1} aria-labelledby="input-slider"
            onChange={(e) => { setCamZoom(e.target.value); }}
          />
        </Grid>
      </Grid>
    </>
  )
}

const XInputProps = {
  step: 10,
  min: 1816,
  max: 2019,
  type: 'number',
}

const YInputProps = {
  step: 0.01,
  min: 0,
  max: 0.25,
  type: 'number',
}

const ZInputProps = {
  step: 1,
  min: 0,
  max: 80,
  type: 'number',
}

function InsPoI() {
  // const scale = useStore((state) => state.scale);
  // const setScale = useStore((state) => state.setScale);

  const pointOfInterest = useStore((state) => state.pointOfInterest);
  const setPointOfInterest = useStore((state) => state.setPointOfInterest);

  const [value1, setValue1] = React.useState(1816);
  const [value2, setValue2] = React.useState(0);
  const [value3, setValue3] = React.useState(0);

  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'x', headerName: 'X', type: 'number', width: 80 },
    { field: 'y', headerName: 'Y', type: 'number', width: 80 },
    { field: 'z', headerName: 'Z', type: 'number', width: 80, },
  ];
  
  const rowsOfInterest = useStore((state) => state.rowsOfInterest);
  const setRowsOfInterest = useStore((state) => state.setRowsOfInterest);

  return (
    <>
      <b>Point of Interest(s)</b><br/>
      <div style={{ height: 'fit-content', width: '100%' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item> X: &nbsp;
            <Input id="poiInput-1" size="small" value={value1} inputProps={XInputProps} 
              onChange={(e) => setValue1(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </Grid>
          <Grid item xs>
            <Slider value={typeof value1 === 'number' ? value1 : 0} min={XInputProps.min} max={XInputProps.max} step={1} 
              aria-labelledby="input-slider" onChange={(e, newValue) => { setValue1(newValue); }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item> Y: &nbsp;
            <Input id="poiInput-2" size="small" value={value2} inputProps={YInputProps} 
              onChange={(e) => setValue2(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </Grid>
          <Grid item xs>
            <Slider value={typeof value2 === 'number' ? value2 : 0} min={YInputProps.min} max={YInputProps.max} step={0.01} 
              aria-labelledby="input-slider" onChange={(e, newValue) => { setValue2(newValue); }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item> Z: &nbsp;
            <Input id="poiInput-3" size="small" value={value3} 
              inputProps={ZInputProps} 
              onChange={(e) => setValue3(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </Grid>
          <Grid item xs>
            <Slider value={typeof value3 === 'number' ? value3 : 0} min={ZInputProps.min} max={ZInputProps.max} step={1} 
              aria-labelledby="input-slider" onChange={(e, newValue) => { setValue3(newValue); }}
            />
          </Grid>
        </Grid>
        <Button 
          size="small" variant="contained" 
          onClick={() => {
            let [x, y, z] = [
              document.getElementById('poiInput-1').value, 
              document.getElementById('poiInput-2').value, 
              document.getElementById('poiInput-3').value
            ];
            console.log(x.length, y.length, z.length)

            for(let i=1; i<rowsOfInterest.length + 2; i++){
              if(rowsOfInterest.filter(item => item.id == i).length == 0){
                setRowsOfInterest(rowsOfInterest.concat({
                  id: i, 
                  x: x.length == 0 ? null : x * 1, 
                  y: y.length == 0 ? null : y * 1, 
                  z: z.length == 0 ? null : z * 1, 
                }));
                break;
              }
            }
          }}
        >
          Add
        </Button>
        <br/><br/>
        <DataGrid
          density='compact'
          rows={rowsOfInterest}
          columns={columns}
          pageSizeOptions={[5, 5]}
          checkboxSelection
          hideFooter={true}
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rowsOfInterest.filter((row) =>
              selectedIDs.has(row.id)
            );
            setPointOfInterest(selectedRowData);
          }}
        />
      </div>
      <div>{JSON.stringify(pointOfInterest)}</div>
    </>
  )
}

function Inspector() {

  return (
    <div>
      <InsCamera/>
      <br/>
      <InsPoI/>
    </div>
  );
}

export default Inspector;