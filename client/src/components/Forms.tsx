/** @format */

import React, { Component, Fragment } from "react";
import { Form } from "react-final-form";
import config from "../config";
import { ajaxUtils } from "../utils-lib/axios-utils";
import Encrypt from "../utils-lib/encrypt";
import history from "../utils-lib/history";
import getRouteType from "../utils-lib/routes";
import { Box, FlexBoxRowCenter, SimpleBox } from "./Boxes";
import { BackButton, SubmitButton } from "./Buttons";

const ArrowRight = require("../assets/right-arrow.svg");
const ArrowLeft = require("../assets/left-arrow.svg");

interface IBack {
  label: string;
  path: string;
}

interface IProps {
  onSuccess?: (res: any) => void;
  getOnLoad?: boolean;
  goBack?: IBack;
  children: React.ReactNode;
}

interface IState {
  initValues: any;
  getOnLoad: boolean;
}

export class Frm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      initValues: null,
      getOnLoad: props.getOnLoad || true,
    };
  }

  getSecretKey = () => {
    if (getRouteType() === "manager") return config.secretKey;
    else if (getRouteType() === "school") return config.adminSecretKey;
    else return "";
  };

  componentDidMount() {
    const { getOnLoad } = this.props;
    const apiPath = window.location.pathname.replace("/", "");
    if (getOnLoad !== undefined && getOnLoad === false)
      this.setState({ initValues: {} });
    else
      ajaxUtils.get(apiPath).then((res) => this.setState({ initValues: res }));
  }

  onFrmSubmit = (values: any) => {
    const frmData = { ...values };
    const {
      location: { pathname },
    } = window;
    const apiPath = pathname.replace("/", "");
    const keys = Object.keys(frmData);
    if (keys.indexOf("password") !== -1)
      frmData.password = Encrypt.hashPassword(
        frmData.password,
        this.getSecretKey()
      );
    ajaxUtils.post(apiPath, frmData).then((res) => {
      if (this.props.onSuccess) this.props.onSuccess(res);
    });
  };
  render() {
    const { children, goBack } = this.props;
    const { initValues } = this.state;
    return (
      <Fragment>
        {initValues && (
          <Form
            onSubmit={this.onFrmSubmit}
            initialValues={initValues}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <SimpleBox>
                  {children}
                  <FlexBoxRowCenter>
                    <Box style={{ marginRight: "40%" }}>
                      <SubmitButton
                        type="submit"
                        style={{
                          cursor: submitting ? "not-allowed" : "pointer",
                        }}
                        disabled={submitting}
                      >
                        <FlexBoxRowCenter>
                          <img alt={"Arrow-Right"} src={ArrowRight} />
                          {"Submit"}
                        </FlexBoxRowCenter>
                      </SubmitButton>
                    </Box>
                    <Box>
                      {goBack && goBack.label && (
                        <BackButton
                          onClick={(e: any) => {
                            history.redirectTo(goBack.path);
                          }}
                        >
                          <FlexBoxRowCenter>
                            <img alt={"Arrow-Left"} src={ArrowLeft} />
                            {goBack.label}
                          </FlexBoxRowCenter>
                        </BackButton>
                      )}
                    </Box>
                  </FlexBoxRowCenter>
                </SimpleBox>
              </form>
            )}
          />
        )}
      </Fragment>
    );
  }
}
