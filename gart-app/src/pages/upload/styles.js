import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
    dropperArea: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderWidth: "2px",
        borderRadius: "2px",
        // border-color: 
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#bdbdbd",
        outline: "none",
        // transition: "border", ".24s", "ease-in-out",
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
        minWidth: 275,
        maxWidth: 500,
        // flexGrow: 1,
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      textField: {
        //  width: 200,
      },
      card: {
        minHeight: 500,
      },
      img: {
        maxWidth: 500,
      },
      modalImage:{
        width: "100%",
      },
});