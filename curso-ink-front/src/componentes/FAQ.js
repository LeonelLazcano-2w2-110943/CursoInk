import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@material-ui/core'
import React from 'react'
import style from './Tool/Style';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function FAQ() {
    return (
        <Container>
            <Typography align="center" component="h1" variant="h4" style={style.titulos}>Preguntas frecuentes</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>¿Qué sucede si sospecho de robo de contenido por parte de otro usuario?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Si tienes evidencias puedes enviarlas a nuestro email de soporte, luego analizaremos las pruebas y nos pondremos en contacto.
                        Si todo resulta verídico procederemos a eliminar el curso y al usuario que lo creó.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>¿Cómo contacto con soporte?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Envía un email a soporteCursoInk@soporte.com.ar y uno de nuestros administradores te responderá a la brevedad.
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
                        Envía un email a soporteCursoInk@soporte.com.ar adjuntando las pruebas y procederemos a suspender permanentemente
                        al usuario en cuestión.
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
                        Si un usuario creador está teniendo un comportamiento inadecuado dentro de sus cursos o en otro de sus contenidos
                        envía un email a soporteCursoInk@soporte.com.ar adjuntando las pruebas y procederemos a suspender permanentemente
                        al usuario en cuestión junto con sus cursos y las comunidades creadas por este.
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
                        Si has olvidado alguno de estos datos envianos un email a soporte desde el email que tienes registrado. Luego te
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
                    <Typography>¿Qué tipo de archivos puedo subir como imagen?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Actualmente solo se pueden subir imágenes con extensión jpg, jpeg, png y gif.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>¿Puedo incluir otro usuario creador en mi curso?</Typography>
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
                    <Typography>¿Puedo subir videos en mi curso?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Sí, puedes compartir videos agregando el link del mismo en la creación o actualización del curso.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Si elimino mi curso, comunidad o tema ¿puedo volver a restaurarlo?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Sí, podrás eliminar cualquiera de estas tres opciones que hayas creado, pero no aparecerán disponibles para los
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
                    <Typography>¿Cómo puedo ser parte del staff de CursoInk?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Puedes enviar una solicitud a staffCursoInk@staff.com.ar argumentando el por qué quieres ser parte de CursoInk,
                        nosotros la analizaremos de acuerdo al usuario que la envía
                        y determinaremos si es apto o no para poder moderar en la plataforma.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}
