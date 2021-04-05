import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
  media: {
    height: 'auto',
    // width: 'auto',
    paddingTop: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    // height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  likeoverlay:{
    position: 'absolute',
    top: '20px',
    right: '10px',
    textAlign: 'right',
    // color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px',
    // marginBottom: '10px',
  },
  title: {
    // padding: '0 16px',
  },
  cardActions: {
    // padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalImage:{
    width: "100%",
  },
});