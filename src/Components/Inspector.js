import * as THREE from 'three'
import React, { useRef, useState, useEffect, useCallback, useLayoutEffect, useMemo, Suspense } from 'react'

import { TextField, Grid, Slider } from '@mui/material';
import MuiInput from '@mui/material/Input';
// import TreeView from '@mui/lab/TreeView';
// import TreeItem from '@mui/lab/TreeItem';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import { useStore } from '../BasicElements/Store';

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

function Animator() {
  const scale = useStore((state) => state.scale);
  const setScale = useStore((state) => state.setScale);

  const camPos = useStore((state) => state.camPos);
  const setCamPos = useStore((state) => state.setCamPos);

  const camZoom = useStore((state) => state.camZoom);
  const setCamZoom = useStore((state) => state.setCamZoom);

  return (
    <div>
      {
        // <TreeView
        //   aria-label="file system navigator"
        //   defaultCollapseIcon={<ExpandMoreIcon />}
        //   defaultExpandIcon={<ChevronRightIcon />}
        //   sx={{ height: 240, flexGrow: 1, maxWidth: 300, overflowY: 'auto' }}
        // >
        //   <TreeItem nodeId="1" label="Applications">
        //     <TreeItem nodeId="2" label="Calendar">
        //     <Grid container spacing={2} alignItems="center">
        //       <Grid item> camPosX: &nbsp;
        //         <Input value={camPos[0]} size="small" inputProps={posInputProps}
        //           onChange={(e) => { setCamPos([e.target.value, camPos[1], camPos[2]]); }}
        //         />
        //       </Grid>
        //       <Grid item xs>
        //         <Slider
        //           value={camPos[0]} min={0} max={2000} step={10} aria-labelledby="input-slider"
        //           onChange={(e) => { setCamPos([e.target.value, camPos[1], camPos[2]]); }}
        //         />
        //       </Grid>
        //     </Grid>
        //     </TreeItem>
        //   </TreeItem>
        //   <TreeItem nodeId="5" label="Documents">
        //     <TreeItem nodeId="10" label="OSS" />
        //     <TreeItem nodeId="6" label="MUI">
        //       <TreeItem nodeId="8" label="index.js" />
        //     </TreeItem>
        //   </TreeItem>
        // </TreeView>
      }
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
    </div>
  );
}

export default Animator;