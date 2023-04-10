import React, { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Description as DescriptionIcon, PictureAsPdf as PdfIcon } from "@mui/icons-material";
//import { ReactComponent as PDFIcon } from './pdf-icon.svg';
//import { ReactComponent as JPGIcon } from './jpg-icon.svg';
//import { ReactComponent as PNGIcon } from './png-icon.svg';
//import LinearProgress from "@mui/material/LinearProgress";
function ImageUploader() {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = async () => {

        if (!file) {
            setErrorMessage("Por favor selecione um arquivo para fazer upload.");
            return;
        }

        // informações de autenticação
        const USERNAME = "gasperpb";
        const REPO_NAME = "boracodar14";
        const TOKEN = "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";

        // informações do arquivo
        const FILE_NAME = file.name;

        // leia o arquivo como bytes e codifique em base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const fileEncoded = reader.result.replace(/^data:.+;base64,/, "");

            // construa a URL de upload
            const url = `https://api.github.com/repos/${USERNAME}/${REPO_NAME}/contents/${FILE_NAME}`;

            // construa o cabeçalho de autenticação
            const headers = {
                Authorization: `Token ${TOKEN}`,
                "Content-Type": "application/json",
            };

            // construa o corpo da solicitação
            const data = {
                message: "Adicionar imagem",
                content: fileEncoded,
            };

            try {
                // faça a solicitação de upload
                await axios.put(url, data, { headers });
                console.log("Upload de imagem concluído com sucesso!");

                // adicione o nome do arquivo à lista de arquivos enviados
                setUploadedFiles([...uploadedFiles, FILE_NAME]);
            } catch (error) {
                console.error("Erro ao fazer upload de imagem:", error.message);
            }
        };
    };

    return (
        <div style={{ display: "fle", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>

                <Box
                    sx={{
                        marginTop: "142px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "160px",
                        width: "440px",
                        backgroundColor: "#C1B2FA",
                        padding: "50px 0px px",
                        borderRadius: "8px",
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <img src="CloudArrowUp.png" alt="" style={{ width: "48px", height: "48px", marginTop: "50px" }} />
                    <Typography variant="h5" sx={{ mb: 2, color: "#FFFFFF" }}>
                        Arraste ou clique para fazer upload
                    </Typography>
                    {file && (
                        <Typography variant="body1" sx={{ mb: 2, color: "#FFFFFF" }}>
                            Nome do arquivo: {file.name}
                        </Typography>
                    )}
                </Box>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={handleUpload} variant="text">
                    Enviar imagem
                </Button>

            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {errorMessage && <p style={{ color: "#FF0000" }}>{errorMessage}</p>}
                {uploadedFiles.length > 0 &&
                    uploadedFiles.map((fileName) => (
                        <div key={fileName} style={{ alignItems: "center", color: "#74dd11", width: "440px", height: "72px", backgroundColor: "white", boxShadow: "5px 5px 5px #575361", borderRadius: "8px" }}>
                            {fileName.endsWith(".pdf") ? <PdfIcon style={{ marginRight: "10px" }} /> : <DescriptionIcon style={{ marginRight: "10px" }} />}
                            {fileName}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ImageUploader;
