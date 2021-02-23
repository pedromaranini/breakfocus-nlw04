import Document, { Html, Head, Main, NextScript} from 'next/document';

// ACESSAR E EDITAR O HTML DA RAIZ DA PÁGINA
// MONTANDO O HTML DA PÁGINA
// USANDO NO DOCUMENT, POIS A CADA ACESSO DO USUÁRIO, SÓ SERA CARREGADO UMA VEZ
// NO _app.tsx, ELE É RECALCULADO
// OU SEJA, USAR NO DOCUMENT TUDO QUE É ESTATICO, TUDO QUE IRA CARREGAR APENAS UMA VEZ
export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="favicon.png" type="image/png" />

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}