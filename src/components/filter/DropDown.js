import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

export default function DropDown(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} size="small" variant="outlined">
      <InputLabel>{props.label}</InputLabel>
      <Select value={props.value || ""} onChange={props.onChange} label={props.label}>
        {props.data &&
          props.data.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.name || item.value}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
