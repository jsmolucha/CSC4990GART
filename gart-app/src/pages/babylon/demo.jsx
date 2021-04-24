import React, { useState } from 'react'
// import { Button } from 'reactstrap'
import { Engine, Scene } from 'react-babylonjs'
import { Vector3, Color3, ActionManager, SetValueAction } from '@babylonjs/core';
import { PrismCode } from 'react-prism';
// import Octicon, {ArrowDown, ArrowUp} from '@githubprimer/octicons-react'
import ScaledModelWithProgress from './ScaledModelWithProgress'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import style from "../post/styles.css"
import NavBar from '../Nav/navbar';
import useStyles from "../post/postCard/styles";
// import './WithModel.css'

const WithModel = props => {
    const classes = useStyles();
    const [avocadoSettings, updateAvocadoSettings] = useState({
        avocadoYPos: -1.5,
        avocadoScaling: 3.0
    })


    const moveAvocadoDown = () => {
        updateAvocadoSettings((state) => ({
            ...state,
            avocadoYPos: state.avocadoYPos - 0.5
        }))
    }

    const moveAvocadoUp = () => {
        updateAvocadoSettings((state) => ({
            ...state,
            avocadoYPos: state.avocadoYPos + 0.5
        }))
    }

    // const increaseAvocadoSize = () => {
    //   updateAvocadoSettings((state) => ({
    //     ...state,
    //     avocadoScaling: state.avocadoScaling + 0.1
    //   }))
    // }

    // const decreaseAvocadoSize = () => {
    //   updateAvocadoSettings((state) => ({
    //     ...state,
    //     avocadoScaling: state.avocadoScaling - 0.1
    //   }))
    // }

    const onModelLoaded = (model) => {
        let mesh = model.meshes[1];
        console.log('loaded mesh:', mesh);
        mesh.actionManager = new ActionManager(mesh._scene);
        mesh.actionManager.registerAction(
            new SetValueAction(
                ActionManager.OnPointerOverTrigger,
                mesh.material,
                'wireframe',
                true
            )
        )
        mesh.actionManager.registerAction(
            new SetValueAction(
                ActionManager.OnPointerOutTrigger,
                mesh.material,
                'wireframe',
                false
            )
        )
    }

    let baseUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/";

    return (
        <div className="profilePage">
            <NavBar />
            <Box display="flex" height={"100%"} ml={5} mr={5} width="auto">
                <Box m={5}>


                    <Card className={classes.card} id="cardBody">

                        <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
                            <Scene clearColor={Color3.FromInts(255, 165, 0)}>
                                <arcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2} radius={9.0} target={Vector3.Zero()} minZ={0.001} />
                                <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />

                                <ScaledModelWithProgress rootUrl={`${baseUrl}BoomBox/glTF/`} sceneFilename="BoomBox.gltf" scaleTo={3}
                                    progressBarColor={Color3.FromInts(255, 165, 0)} center={new Vector3(2.5, 0, 0)}
                                    onModelLoaded={onModelLoaded}
                                />

                                <ScaledModelWithProgress rootUrl={`${baseUrl}Avocado/glTF/`} sceneFilename="Avocado.gltf" scaleTo={avocadoSettings.avocadoScaling}
                                    progressBarColor={Color3.FromInts(255, 165, 0)} center={new Vector3(-2.5, avocadoSettings.avocadoYPos, 0)}
                                />
                            </Scene>
                        </Engine>

                        <CardContent>
                        <h3>Demo by @carlos</h3>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This is a static demo on how 3d object would have been rendered with React and Babylon.
                        </Typography>
                        <div className={classes.details}>
                        <CardActions className={classes.cardActions}>
                            <div className={classes.tagContainer}>
                            Move Avocado:
          <Button onClick={moveAvocadoUp}>UP</Button>
          &nbsp;&nbsp;
          <Button onClick={moveAvocadoDown}>Down</Button>
          </div>
          </CardActions>
          </div>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </div>
    )
}

export default WithModel