import {
  Checkbox,
  createStyles,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    noteInput: {
      width: "100%",
    },
  })
);

export default function MyList() {
  const classes = useStyles();
  const [list, setList] = useState({
    items: [
      {
        checked: false,
        text: "",
        userWritted: false,
      },
    ],
  });
  console.log(list);
  return (
    <List className={classes.root}>
      {list.items.map((item, index) => {
        const labelId = `checkbox-list-label-${item.text}`;

        return (
          <ListItem key={index} role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={list.items[index].checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                onClick={() => {
                  setList({
                    items: list.items.map((item, indx) => {
                      if (indx === index) {
                        return { ...item, checked: !item.checked };
                      } else {
                        return { ...item };
                      }
                    }),
                  });
                }}
              />
            </ListItemIcon>
            <ListItemText id={labelId}>
              <InputBase
                placeholder="Añade un elemento a la lista"
                className={classes.noteInput}
                value={item.text}
                onChange={(e) => {
                  const { value } = e.target;
                  const userWritted = item.userWritted;
                  const newItems = list.items.map((item, indx) => {
                    if (indx === index) {
                      return { ...item, text: value, userWritted: true };
                    }
                    return { ...item };
                  });
                  const newItems2 = list.items.map((item, indx) => {
                    if (indx === index) {
                      return { ...item, text: value };
                    }
                    return { ...item };
                  });

                  const newItems3 = list.items.filter(
                    (item, indx) => !(index === indx)
                  );

                  newItems.push({
                    text: "",
                    checked: false,
                    userWritted: false,
                  });
                  if (!userWritted) {
                    setList({
                      items: newItems,
                    });
                  } else {
                    if (value === "") {
                      return setList({
                        items: newItems3,
                      });
                    }
                    setList({
                      items: newItems2,
                    });
                  }
                }}
              />
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}
