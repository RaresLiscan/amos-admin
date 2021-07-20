import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import dataProviderNode from "../data/dataProviderNode";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function ParticipantComponent(props) {
    const classes = useStyles();
    const [reload, setReload] = React.useState(false);

    const { participants } = props;
    console.log(props);

    const requestDeletion = async (id) => {

        await fetch(`${dataProviderNode.API_URL}/participants/${id}`, {
            method: "DELETE",
            cors: "cors",
        })
            .then(response => {
                setReload(true);
                props.reload();
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Nume</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Număr de telefon</StyledTableCell>
                        <StyledTableCell align="right">Data înregistrării</StyledTableCell>
                        <StyledTableCell align="right">Acțiuni</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {participants.map((row, index) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {index+1}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.name}</StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.phone_number}</StyledTableCell>
                            <StyledTableCell align="right">{row.registration_date}</StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton onClick={() => requestDeletion(row.id)}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}