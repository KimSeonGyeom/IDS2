import * as THREE from 'three'
import React, { useRef, useFrame, useLayoutEffect, useMemo, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import { shallow } from 'zustand/shallow'

import { Slider, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from '@mui/x-data-grid';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { MODE_EDIT_CAMERA, MODE_PLAY_SCROLLY, useCanvasStore, useClipStore, usePOIStore } from '../BasicElements/Store';
import { scrollLength } from '../BasicElements/Constants';

const Input = styled(MuiInput)`
  width: 64px;
  margin: 6px 0px;
`;

const MyButton = styled(Button)`
  margin: 10px 0px;
`

const MySlider = styled(Slider)`
  margin: 0px 30px;
  width: 200px;
  padding: 0px;
`

const MyTableCell = styled(TableCell)`
  padding: 0px;
  width: 80px;
  height: 20px;
`

const MyTable = styled(Table)`
  width: fit-content;
`

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

function CamPosX() {
  const [animation] = useClipStore((state) => [state.animation], shallow);
  const [mode, progressVal, spec, setSpec] = useCanvasStore((state) => [
    state.mode, state.progressVal, state.spec, state.setSpec
  ], shallow);

  return (
    <>
      camPosX: &nbsp;
      <Input value={mode == MODE_PLAY_SCROLLY? animation[progressVal].camX : mode == MODE_EDIT_CAMERA? spec.camX : 1000} 
        size="small" inputProps={posInputProps}
        onChange={(e) => { if(mode == MODE_EDIT_CAMERA){ setSpec('camX', e.target.value); } }}
      />
      <MySlider
        value={mode == MODE_PLAY_SCROLLY? animation[progressVal].camX : mode == MODE_EDIT_CAMERA? spec.camX : 1000} 
        min={0} max={2000} step={10} aria-labelledby="input-slider"
        onChange={(e) => { if(mode == MODE_EDIT_CAMERA){ setSpec('camX', e.target.value); } }}
      />
    </>
  )
}

function CamPosY() {
  const [animation] = useClipStore((state) => [state.animation], shallow);
  const [mode, progressVal, spec, setSpec] = useCanvasStore((state) => [
    state.mode, state.progressVal, state.spec, state.setSpec
  ], shallow);

  return (
    <>
      camPosY: &nbsp;
      <Input 
        value={mode == MODE_PLAY_SCROLLY? animation[progressVal].camY : mode == MODE_EDIT_CAMERA? spec.camY : 1000} 
        size="small" inputProps={posInputProps}
        onChange={(e) => { if(mode == MODE_EDIT_CAMERA){ setSpec('camY', e.target.value); } }}
      />
      <MySlider
        value={mode == MODE_PLAY_SCROLLY? animation[progressVal].camY : mode == MODE_EDIT_CAMERA? spec.camY : 1000} 
        min={0} max={2000} step={10} aria-labelledby="input-slider"
        onChange={(e) => { if(mode == MODE_EDIT_CAMERA){ setSpec('camY', e.target.value); } }}
      />
    </>
  )
}

function CamPosZ() {
  const [animation] = useClipStore((state) => [state.animation], shallow);
  const [mode, progressVal, spec, setSpec] = useCanvasStore((state) => [
    state.mode, state.progressVal, state.spec, state.setSpec
  ], shallow);

  return (
    <>
      camPosZ: &nbsp;
      <Input 
        value={mode == MODE_PLAY_SCROLLY? animation[progressVal].camZ : mode == MODE_EDIT_CAMERA? spec.camZ : 0} 
        size="small" inputProps={posInputProps}
        onChange={(e) => { if(mode == MODE_EDIT_CAMERA){ setSpec('camZ', e.target.value); } }}
      />
      <MySlider
        value={mode == MODE_PLAY_SCROLLY? animation[progressVal].camZ : mode == MODE_EDIT_CAMERA? spec.camZ : 0} 
        min={-1000} max={1000} step={10} aria-labelledby="input-slider"
        onChange={(e) => { if(mode == MODE_EDIT_CAMERA){ setSpec('camZ', e.target.value); } }}
      />
    </>
  )
}

function CamZoom() {
  const [animation] = useClipStore((state) => [state.animation], shallow);
  const [mode, progressVal, spec, setSpec] = useCanvasStore((state) => [
    state.mode, state.progressVal, state.spec, state.setSpec
  ], shallow);

  return (
    <>
      camZoom: &nbsp;
      <Input 
        value={mode == MODE_PLAY_SCROLLY? animation[progressVal].camZoom : mode == MODE_EDIT_CAMERA? spec.zoom : 10} 
        size="small" inputProps={zoomInputProps}
        onChange={(e) => { if(mode == MODE_EDIT_CAMERA){ setSpec('zoom', e.target.value); } }}
      />
      <MySlider
        value={mode == MODE_PLAY_SCROLLY? animation[progressVal].camZoom : mode == MODE_EDIT_CAMERA? spec.zoom : 10} 
        min={1} max={200} step={1} aria-labelledby="input-slider"
        onChange={(e) => { if(mode == MODE_EDIT_CAMERA){ setSpec('zoom', e.target.value); } }}
      />
    </>
  )
}

function ClipsTable() {
  const [cam] = useClipStore((state) => [ state.cam], shallow);
  
  const createData = useCallback((id, progress, camX, camY, camZ, camZoom) => {
    return { id, progress, camX, camY, camZ, camZoom };
  }, []);

  const idSpec = useMemo(() => {
    return(
      {
        width: '30px',
        textAlign: 'center'
      }
    )
  }, [])

  const THead = useMemo(() => {
    return(
      <TableHead>
        <TableRow>
          <MyTableCell style={idSpec} > ID </MyTableCell>
          <MyTableCell align="right"> Prgs </MyTableCell>
          <MyTableCell align="right"> X </MyTableCell>
          <MyTableCell align="right"> Y </MyTableCell>
          <MyTableCell align="right"> Z </MyTableCell>
          <MyTableCell align="right"> Zoom </MyTableCell>
        </TableRow>
      </TableHead>
    );
  }, []);

  const TBody = useMemo(() => {
    return(
      <TableBody>
        {cam.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <MyTableCell style={idSpec} component="th" scope="row"> {row.id} </MyTableCell>
            <MyTableCell align="right">{row.progress}</MyTableCell>
            <MyTableCell align="right">{row.camX}</MyTableCell>
            <MyTableCell align="right">{row.camY}</MyTableCell>
            <MyTableCell align="right">{row.camZ}</MyTableCell>
            <MyTableCell align="right">{row.camZoom}</MyTableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }, [cam]);

  return(
    <MyTable size="small" aria-label="a dense table">
      {THead}
      {TBody}
    </MyTable>
  )
}

function InsCamera() {
  const [getAnimation, animation, addCam] = useClipStore((state) => [
    state.getAnimation, state.animation, state.addCam
  ], shallow);
  const mode = useCanvasStore((state) => state.mode);
  const [setMode, progressVal] = useCanvasStore((state) => [state.setMode, state.progressVal], shallow);
  const [spec] = useCanvasStore((state) => [state.spec], shallow);

  const addClip = () =>{
    addCam({
      "progress": progressVal / scrollLength * 100,
      "camX": spec.camX,
      "camY": spec.camY,
      "camZ": spec.camZ,
      "zoom": spec.zoom,
    })
  }

  const ModeButtons = useMemo(() => {
    return(
      <>
        <MyButton 
          size="small" disabled={mode==MODE_PLAY_SCROLLY} variant="contained" 
          onClick={() => { setMode(MODE_PLAY_SCROLLY) }}
        >Play Mode</MyButton>
        <MyButton 
          size="small" disabled={mode==MODE_EDIT_CAMERA} variant="contained" 
          onClick={() => { setMode(MODE_EDIT_CAMERA) }}
        >Edit Mode</MyButton>
      </>
    )
  }, [mode])

  return (
    <>
      {ModeButtons}
      <br/><br/>
      <b>Clip</b><br/>
      <CamPosX />
      <br/>
      <CamPosY />
      <br/>
      <CamPosZ />
      <br/>
      <CamZoom />
      <br/>
      <MyButton size="small" variant="contained"  onClick={() => {addClip();}}> Add Clip </MyButton>
      <ClipsTable />
    </>
  )
}

function InsPoI() {
  const pointOfInterest = usePOIStore((state) => state.pointOfInterest);
  const setPointOfInterest = usePOIStore((state) => state.setPointOfInterest);

  const [value1, setValue1] = React.useState(1816);
  const [value2, setValue2] = React.useState(0);
  const [value3, setValue3] = React.useState(0);

  const XInputProps = useMemo(() => { return {
    step: 10,
    min: 1816,
    max: 2019,
    type: 'number',
  }}, []);
  
  const YInputProps = useMemo(() => { return {
    step: 0.01,
    min: 0,
    max: 0.25,
    type: 'number',
  }}, []);
  
  const ZInputProps = useMemo(() => { return {
    step: 1,
    min: 0,
    max: 80,
    type: 'number',
  }}, []);

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'x', headerName: 'X', type: 'number', width: 80 },
    { field: 'y', headerName: 'Y', type: 'number', width: 80 },
    { field: 'z', headerName: 'Z', type: 'number', width: 80, },
  ], []);
  
  const rowsOfInterest = usePOIStore((state) => state.rowsOfInterest);
  const setRowsOfInterest = usePOIStore((state) => state.setRowsOfInterest);

  const ADDPOIButton = useMemo(() => {
    return(
      <MyButton 
        size="small" variant="contained" 
        onClick={() => {
          let [x, y, z] = [
            document.getElementById('poiInput-1').value, 
            document.getElementById('poiInput-2').value, 
            document.getElementById('poiInput-3').value
          ];

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
      </MyButton>
    )
  }, [rowsOfInterest])

  return (
    <>
      <b>Point of Interest(s)</b><br/>
      X: &nbsp;
      <Input id="poiInput-1" size="small" value={value1} inputProps={XInputProps} 
        onChange={(e) => setValue1(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <MySlider value={typeof value1 === 'number' ? value1 : 0} min={XInputProps.min} max={XInputProps.max} step={1} 
        aria-labelledby="input-slider" onChange={(e, newValue) => { setValue1(newValue); }}
      /><br/>
    
      Y: &nbsp;
      <Input id="poiInput-2" size="small" value={value2} inputProps={YInputProps} 
        onChange={(e) => setValue2(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <MySlider value={typeof value2 === 'number' ? value2 : 0} min={YInputProps.min} max={YInputProps.max} step={0.01} 
        aria-labelledby="input-slider" onChange={(e, newValue) => { setValue2(newValue); }}
      /><br/>
    
      Z: &nbsp;
      <Input id="poiInput-3" size="small" value={value3} inputProps={ZInputProps} 
        onChange={(e) => setValue3(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <MySlider value={typeof value3 === 'number' ? value3 : 0} min={ZInputProps.min} max={ZInputProps.max} step={1} 
        aria-labelledby="input-slider" onChange={(e, newValue) => { setValue3(newValue); }}
      /><br/>
      {ADDPOIButton}
      <div style={{ height: 'fit-content', width: '100%', margin: '10px 0px' }}>
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
      <br/><br/><br/>
      <InsPoI/>
    </div>
  );
}

export default Inspector;