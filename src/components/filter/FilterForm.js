import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import DropDown from "./DropDown";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 10,
  },
}));

export default function FilterForm(props) {
  const classes = useStyles();

  const selectedId = props.columns.find((row) => row.field === props.condition.id);

  return (
    <div className={classes.root}>
      <Grid spacing={1} alignItems="center" container>
        <Grid item xs={2}>
          {props.index === 0 && "Where"}
          {props.index === 1 && (
            <DropDown
              value={props.join}
              onChange={props.onJoinSelect}
              data={[
                { value: "AND", name: "AND" },
                { value: "OR", name: "OR" },
              ]}
            />
          )}
          {props.index > 1 && `${props.join}`}
        </Grid>
        <Grid item xs={3}>
          <DropDown
            value={props.condition.id}
            onChange={(e) => props.onChangeCondition("id", e.target.value)}
            data={props.columns.map((col) => ({ value: col.field, name: col.title }))}
          />
        </Grid>
        <Grid item xs={3}>
          <DropDown
            onChange={(e) => props.onChangeCondition("operator", e.target.value)}
            value={props.condition.operator}
            data={(selectedId && selectedId.operator) || []}
          />
        </Grid>
        <Grid item xs={3}>
          {selectedId && selectedId.type === "boolean" ? (
            <DropDown
              onChange={(e) => props.onChangeCondition("value", e.target.value)}
              value={props.condition.value}
              data={[
                { name: "Yes", value: true },
                { name: "No", value: false },
              ]}
            />
          ) : (
            <TextField
              size="small"
              onChange={(e) => props.onChangeCondition("value", e.target.value)}
              variant="outlined"
              value={props.condition.value || ""}
            />
          )}
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => props.onDelete(props.index)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
