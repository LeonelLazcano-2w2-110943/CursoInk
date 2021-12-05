import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@material-ui/core'
import React from 'react'
import style from './Tool/Style';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function FAQ() {
    return (
        <Container>
            <Typography align="center" component="h1" variant="h4" style={style.titulos}>Preguntas frecuentes!</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Puedo pedir donaciones en mis cursos?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Sencillamente no, bajo ningún concepto. Curso Ink está pensada como plataforma para compartir conocimiento
                        sin esperar nada a cambio mas que mas conocimiento y lamentablemente no es negociable. Todo lo que hagas fuera
                        de la plataforma no es responsabilidad de CursoInk.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Qué sucede si sospecho de robo de contenido por parte de otro usuario?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Si tenés evidencias podes enviarlas a nuestro mail de soporte, luego analizamos las pruebas y nos pondremos en contacto.
                        Si todo resulta verídico procedemos a eliminar el curso y el usuario que lo creó.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Cómo contacto con soporte?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Enviá un mail a soporteCursoInk@soporte.com.ar y uno de nuestros empleados te responderá a la brevedad.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Un usuario me está hostigando, chantajeando o acosando</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Enviá un mail a soporteCursoInk@soporte.com.ar adjuntando las pruebas y procederemos a banear permanentemente
                        el usuario en cuestion.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Un usuario creador está siendo intolerante, insulta u hostiga</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Si un usuario creador está teniendo un comportamiento inadecuado dentro de sus cursos o en otros
                        enviá un mail a soporteCursoInk@soporte.com.ar adjuntando las pruebas y procederemos a banear permanentemente
                        el usuario en cuestion junto con sus cursos y las comunidades creadas por este.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Olvidé mi usuario o contraseña</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Si te olvidaste algunos de estos datos envianos un mail a soporte desde el mail que tenés registrado. Luego te
                        enviaremos una nueva contraseña para que puedas ingresar.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Qué tipos de archivos puedo subir como imagen?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Actualmente solo se pueden subir imagenes con extensión jpg, jpeg, png y gif.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Puedo incluir otro usuario creador en mi curso?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Por el momento no disponemos de esta opción, pero en el futuro podrás agregar cuantos usuarios creadores quieras
                        a tu curso.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Puedo subir videos en mi curso?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Por el momento no disponemos de esta opción, pero en el futuro podrás agregar videos en tus cursos.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Si elimino mi curso, comunidad o tema puedo volver a restaurarlo?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Sí, podrás eliminar cualquiera de estas tres opciones que hayas creado, pero no apareceran disponibles a los
                        usuarios a menos que los restaures.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Cómo puedo ser parte del staff de CursoInk?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Podés enviar una solicitud a staffCursoInk@staff.com.ar argumentando el por qué querés ser parte de CursoInk,
                        nosotros analizamos de acuerdo al usuario que la envía
                        y determinamos si es apto o no para poder moderar en la plataforma.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}
