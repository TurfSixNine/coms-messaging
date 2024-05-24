import PageTemplate from "../../templates"
import {  BoxContainer } from './styles'
import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React, { useState, ChangeEvent, useContext } from "react";
import { CustomInput, Button as CustomButton, TextEditor, BasicSelect, BasicModal } from "../../components";
import { axiosInstance } from "../../axiosInstance";
import { AddGroup } from "../Groups/add-group";
import { AlertContext } from "../../context";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { USER_ROLE } from "../../interfaces";

interface MessageForm {
    types: string[];
    title: string;
    body: string;
    groupId: string;
    [key: string]: string | string[]
}


const SendMessageContent: React.FC = () => {
    const [messageForm, setMessageForm] = useState<MessageForm>({
        types: [],
        title: '',
        body: '',
        groupId: ''
    })
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { groups } = useSelector((state: RootState) => state.user);
    const { setAlert } = useContext(AlertContext);

    const handleMessageTypeClick = (chipName: string) => {
        const currentMessageTypes = messageForm.types;

        const chipExists = currentMessageTypes.includes(chipName);

        let types: string[] = [];

        if (chipExists) {
            types = currentMessageTypes.filter(type => type !== chipName);
        } else {
            types = [...currentMessageTypes, chipName];
        }

        setMessageForm({
            ...messageForm,
            types
        })

    }

    const handleTitleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;

        const title = target.value;

        setMessageForm({
            ...messageForm,
            title
        });
    }

    const formHasErrors = (): boolean => {
        for (let key in (messageForm)) {
            if (messageForm[key] === '') return true
        }
        return false
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (formHasErrors()) {
            setLoading(false)
            setTimeout(() => {
                setAlert({
                    message: "Kindly populate all fields",
                    severity: "warning",
                    state: true
                })
            }, 3000);

            return;
        }
        const body = JSON.stringify({ ...messageForm })

        const response = await axiosInstance.post("/messages", body)

        if (response.status === 500 || response.status === 400) {
            setAlert({
                message: "An error occured while sending the message, please try again",
                severity: "error",
                state: true
            })
            setLoading(false)
            return;
        } else {
            setAlert({
                message: "successfully sent your message",
                severity: "success",
                state: true
            })
        }
        setMessageForm({
            types: [],
            title: '',
            body: '',
            groupId: ''
        })

        setLoading(false)
    }
    return (<BoxContainer>
        <Grid container spacing={2}>
            <Grid item md={4} xs={2}>
                <Typography variant="h6">Select Messages Types :</Typography>

            </Grid>
            <Grid item md={8} xs={10} marginBottom={7}>
                <Stack direction="row" spacing={4} >
                    {["WhatsApp", "SMS", "TTS"].map((chip, index) => {
                        const isSelected = (messageForm.types.includes(chip))
                        return (<Chip
                            key={index} label={chip}
                            sx={{
                                width: 100,
                                height: 40,
                            }}
                            variant="filled"
                            color={isSelected ? "primary" : "default"}
                            onClick={handleMessageTypeClick.bind(this, chip)} />)
                    }
                    )}
                </Stack>
            </Grid>
            <Grid item md={4} xs={2} marginBottom={7}>
                <Typography variant="h6">Select Groups :</Typography>

            </Grid>
            <Grid item md={8} xs={7}>
                <BasicSelect getValue={(id) => setMessageForm({ ...messageForm, groupId: id })} placeholder="Select a group" menu={groups} onClick={() => setOpenModal(true)} />

            </Grid>
            <Grid item md={4} xs={2}>
                <Typography variant="h6">Message :</Typography>

            </Grid>
            <Grid item md={8} xs={10} marginBottom={5}>
                <Stack direction="column" spacing={5} justifyContent="center">
                    <CustomInput
                        value={messageForm.title}
                        onChange={handleTitleChange.bind(this)}
                        placeholder="Message Title"
                        variant="filled" width="100%" />
                    <TextEditor value={messageForm.body} onChange={(arg) => setMessageForm({ ...messageForm, body: arg })} />

                </Stack>
            </Grid>
            <Grid item xs={0} md={4}>
            </Grid>
            <Grid item xs={12} md={8} justifyContent="center">
                <CustomButton loading={loading} onClick={handleSubmit} width={150} btnTitle="Send message" />
            </Grid>
        </Grid>

        <BasicModal open={openModal} onClose={() => setOpenModal(false)}>
            <AddGroup />
        </BasicModal>

    </BoxContainer>)
}



export const SendMessage = (props: { role: USER_ROLE }) => {
    const { pathname } = useLocation()

    return (
        <PageTemplate role={props.role} pageTitle={pathname.replaceAll("/", "").toUpperCase()} navButtonText="Send a message">
            <SendMessageContent />
        </PageTemplate>)



}
