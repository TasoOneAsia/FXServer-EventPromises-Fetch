import React, { useEffect, useState } from "react";
import fetchNui from "../utils/fetchNui";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useVisible } from "../providers/VisibleProvider";
import { MockDataItem } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: "opacity 0.2s linear",
    background: "#151A1F",
    width: "50%",
    height: "70%",
    borderRadius: "10px",
    color: theme.palette.text.primary,
    fontWeight: 300,
  },
  divider: {
    height: 2,
  },
}));

interface InfoCardProps {
  id: string;
  loading?: boolean;
  profile_picture?: string;
  title?: string;
  subheader?: string;
  description?: string;
  visible: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  id,
  loading,
  profile_picture,
  title,
  subheader,
  description,
  visible,
}: InfoCardProps) => {
  return (
    <Fade in={visible} mountOnEnter unmountOnExit>
      <Card key={id} elevation={2}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="pulse"
                variant="circle"
                width={40}
                height={40}
              />
            ) : (
              <Avatar src={profile_picture} />
            )
          }
          title={
            loading ? (
              <Skeleton animation="pulse" height={10} width="80%" />
            ) : (
              <Typography variant="subtitle1">{title}</Typography>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="pulse" height={10} width="40%" />
            ) : (
              <Typography variant="subtitle2" color="textSecondary">
                {subheader}
              </Typography>
            )
          }
        />
        <CardContent>
          {loading ? (
            <>
              <Skeleton height={10} animation="pulse" />
              <Skeleton height={10} animation="pulse" />
              <Skeleton height={10} width="40%" />
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
        </CardContent>
        {!loading && (
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button size="small" color="primary" variant="outlined">
              Like
            </Button>
            <Button size="small" color="primary" variant="outlined">
              Ban
            </Button>
          </CardActions>
        )}
      </Card>
    </Fade>
  );
};

export const DataListComp: React.FC = () => {
  const [data, setData] = useState<MockDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { visible } = useVisible();

  const classes = useStyles();

  useEffect(() => {
    if (!data.length) {
      fetchNui<MockDataItem[]>("getData").then((value) => {
        setData(value || []);
        setLoading(!value);
      });
    }
    // Only fetch on mount of the component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadingCards = [];

  for (let i = 0; i < 9; i++) {
    loadingCards.push(
      <InfoCard id={`${i}-loading`} loading visible={loading} />
    );
  }

  return (
    <Fade in={visible} mountOnEnter unmountOnExit>
      <Box className={classes.root} component={Paper} p={4} overflow="hidden">
        <Box>
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            Reactive Data Thing
          </Typography>
          <Divider className={classes.divider} />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          py={2}
          gridGap={10}
        >
          {loading && loadingCards}
          {!loading &&
            data.map((value, index) => (
              <InfoCard
                visible={!loading}
                id={`${index}-${value.user}`}
                profile_picture={value.profile_picture}
                title={value.user}
                subheader={value.job}
                description={value.description}
              />
            ))}
        </Box>
      </Box>
    </Fade>
  );
};
