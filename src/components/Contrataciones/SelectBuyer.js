import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    margin: {
        margin: theme.spacing(1),
    },
});

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class SelectBuyer extends React.Component{

    render() {

        const {classes, buyers} = this.props;

        //const [age, setAge] = React.useState('');
        const handleChange = event => {
            this.props.setBuyer(event.target.value);
        };

        return (
            <form className={classes.root} autoComplete="off">
                {/*<FormControl className={classes.margin}>
                <InputLabel htmlFor="age-customized-input">Age</InputLabel>
                <BootstrapInput id="age-customized-input" />
            </FormControl>

            <FormControl className={classes.margin}>
                <InputLabel htmlFor="age-customized-select">Age</InputLabel>
                <Select
                    value={age}
                    onChange={handleChange}
                    input={<BootstrapInput name="age" id="age-customized-select" />}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>*/}
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="age-customized-native-simple">Institución</InputLabel>
                    <NativeSelect
                        //value={age}
                        onChange={handleChange}
                        input={<BootstrapInput name="buyer" id="age-customized-native-simple"/>}
                    >
                        <option value="any">Cualquiera</option>
                        {
                            buyers.map((b,i)=>{
                                return <option key={i} value={b.id}>{b.name}</option>
                            })

                        }
                    </NativeSelect>
                </FormControl>
            </form>
        );
    }

}


export default withStyles(styles)(SelectBuyer);