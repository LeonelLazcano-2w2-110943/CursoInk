import { Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import style from './componentes/Tool/Style'

export default function TerminosYCondiciones() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <Container>
            <Grid style={style.titulos}>
                <Typography align="center" component="h1" variant="h3">Términos y Condiciones de Uso</Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">INFORMACIÓN RELEVANTE</Typography>
                <Typography component="h1" variant="subtitle1">Es requisito necesario para la adquisición de la información que se ofrece en este
                    sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios
                    implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente
                    documento. Todas lo ofrecido por nuestro sitio web pudieran ser creadas, enviadas o presentadas
                    por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. Para poder acceder a los
                    servicios presentados por nuestro sitio web, será necesario el registro por parte del usuario.
                </Typography>
                <Typography>
                    El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento.
                    No asumimos la responsabilidad en caso de que entregue dicha clave a terceros.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">CAPACIDAD LEGAL DE LOS USUARIOS</Typography>
                <Typography component="h1" variant="subtitle1">Solo podrán acceder y utilizar el Sitio y/o la
                    Aplicación, los Servicios y/o contenidos de <strong>CursoInk</strong>, quienes a tenor de la legislación vigente en su lugar
                    de residencia, sea mayores de edad y puedan válidamente emitir su consentimiento para la celebración de contratos.
                    Quienes, a tenor de la legislación vigente, no sean mayores de edad o no posean tal capacidad para acceder
                    u obligarse válidamente frente a las Condiciones Generales aquí establecidas, deberán obtener inexcusablemente
                    autorización previa de sus representantes legales, quienes serán considerados responsables de todos los actos
                    realizados por los incapaces a su cargo.
                </Typography>
                <Typography component="h1" variant="subtitle1">Cuando se trate de falta de capacidad por minoría de edad,
                    la responsabilidad en la determinación de los Servicios y contenidos a los que acceden los menores de edad
                    corresponde a los mayores a cuyo cargo se encuentren, sin embargo, en ningún caso estará permitido el acceso
                    al Sitio y/o la Aplicación y/o los Servicios por parte de menores de 18 años.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">LIBRE ACCESO A LOS SERVICIOS</Typography>
                <Typography component="h1" variant="subtitle1">Más allá de la obligación de cumplimiento de todas y cada una de
                    estas Condiciones Generales, todos los servicios y contenidos ofrecidos en el Sitio son libremente accesibles
                    por parte de los Usuarios. La libre accesibilidad incluye la gratuidad de los Servicios, que no estarán sujetos
                    al pago de ningún arancel o retribución hacia <strong>CursoInk</strong>.
                </Typography>
                <Typography component="h1" variant="subtitle1">Sin perjuicio de lo dispuesto en el presente punto, <strong>CursoInk </strong>
                    se reserva en forma expresa la facultad de establecer cualquier arancel, canon o costo para acceder o
                    utilizar todo o alguna parte del Sitio y/o la Aplicación y/o los Servicios. Dicha circunstancia será puesta en
                    conocimiento de los Usuarios con suficiente antelación, y aquellos Usuarios que no deseen abonar el costo
                    correspondiente podrán optar por dejar de utilizar el Sitio y/o la Aplicación y/o los Servicios afectados
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">DE LOS COMENTARIOS</Typography>
                <Typography component="h1" variant="subtitle1"> Otro de los servicios brindados,
                    reservado sólo a Usuarios registrados, es la posibilidad de incorporar comentarios en forma de
                    mensajes sobre un curso o tema de otro Usuario, de tal forma que permita un intercambio de opiniones o
                    aportes.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">LINKS HACIA <strong>CURSOINK</strong></Typography>
                <Typography component="h1" variant="subtitle1">El establecimiento de cualquier link, hipervínculo o enlace,
                    entre una página web ajena al Sitio y cualquier página de este último solo podrá realizarse con expresa
                    autorización por parte de <strong>CursoInk</strong>.
                </Typography>
                <Typography component="h1" variant="subtitle1">En ningún caso <strong>CursoInk</strong> será responsable
                    por los contenidos o manifestaciones existentes en las páginas web desde donde se establezcan los
                    hipervínculos hacia el Sitio de <strong>CursoInk</strong>. El hecho que exista un link entre una página
                    web y el Sitio de <strong>CursoInk</strong> no implica que <strong>CursoInk</strong> tenga conocimiento de ello,
                    o que <strong>CursoInk</strong> mantenga relación alguna con los titulares de la página web desde donde se establece el enlace.
                </Typography>
                <Typography component="h1" variant="subtitle1"><strong>CursoInk</strong>, se reserva el derecho a solicitar la remoción o
                    eliminación de cualquier enlace desde una página web ajena al Sitio, en cualquier momento, sin
                    expresión de causa, y sin que sea necesario preaviso alguno. El responsable de la página web
                    desde la cual se efectuare el enlace tendrá un plazo de 48hs. contados a partir del pedido de
                    <strong> CursoInk</strong> para proceder a la remoción o eliminación del mismo.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">LINKS PROVISTOS POR LOS USUARIOS DESDE <strong>CURSOINK</strong></Typography>
                <Typography component="h1" variant="subtitle1">Los Usuarios podrán incorporar en sus cursos o temas links
                    que remitan a distintos recursos alojados fuera del Sitio. El objeto de estos links es i
                    ncrementar las posibilidades de comunicación de los Usuarios, permitiendo así la referencia a
                    cualquier elemento que se encuentre en Internet.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">RESPONSABILIDAD DERIVADA DE LOS LINKS</Typography>
                <Typography component="h1" variant="subtitle1">En ninguno de los casos precedentemente enunciados <strong>CursoInk </strong>
                    controla, respalda o garantiza la seguridad, calidad, licitud, veracidad e idoneidad de los servicios y
                    contenidos a los cuales se acceda a través de un hipervínculo. La inclusión del link no significa que
                    <strong> CursoInk</strong> se encuentre en forma alguna relacionada con el sitio al que dirige el link, ni que apoye,
                    este de acuerdo, facilite o colabore en las actividades que en ese sitio se desarrollen.
                </Typography>
                <Typography component="h1" variant="subtitle1">La responsabilidad por los servicios o contenidos
                    en los sitios enlazados corresponderá exclusivamente a los titulares de dichos sitios. Bajo ningún
                    supuesto <strong>CursoInk</strong> será responsable por las irregularidades, ilicitudes o infracciones que en dichos
                    sitios se registren, no respondiendo en tal sentido por los daños que pudieren experimentar los Usuarios o
                    terceros a partir de los contenidos allí publicados.
                </Typography>
                <Typography component="h1" variant="subtitle1">El Usuario que considere inadecuada una página vinculada
                    desde el Sitio, podrá elevar su queja o recomendación a través del mecanismo de denuncias puesto a
                    disposición de los Usuarios por parte de <strong>CursoInk</strong>.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">FINALIZACION DEL SERVICIO</Typography>
                <Typography component="h1" variant="subtitle1"><strong>CursoInk</strong> podrá a su sola discreción
                    suspender temporalmente o desactivar definitivamente la cuenta de un Usuario, sin que medie previa
                    notificación al mismo, y sin que sea necesaria la invocación de causa alguna, procediéndose en tal
                    caso a la eliminación de toda la información relacionada con la cuenta. Asimismo, <strong>CursoInk</strong> podrá
                    adoptar cualquier otra medida que resulte necesaria o conveniente a los fines de impedir el accedo
                    al Sitio y/o los Servicios por parte de un Usuario, para el caso en que dicho Usuario hubiere
                    incumplido con las presentes Condiciones Generales, o cuando dicho Usuario constituya un riesgo
                    para el Sitio, los Servicios, otros Usuarios y/o <strong>CursoInk</strong>.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">NOTIFICACIONES Y COMUNICACIONES</Typography>
                <Typography component="h1" variant="subtitle1">A los fines que los Usuarios puedan tomar contacto con <strong>CursoInk</strong>,
                    se considerarán válidas las comunicaciones dirigidas a: denunciasCursoInk@denuncias.com.ar.
                </Typography>
                <Typography component="h1" variant="subtitle1">Las notificaciones y comunicaciones cursadas por <strong>CursoInk </strong>
                    a la casilla de correo electrónico que surja como dirección de correo del Usuario o remitente se
                    considerarán eficaces y plenamente válidas. Asimismo, se considerarán eficaces las comunicaciones que
                    consistan en avisos y mensajes insertos en el sitio, o que se envíen durante la prestación de un servicio,
                    que tengan por finalidad informar a los Usuarios sobre determinada circunstancia.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="h5">PRIVACIDAD</Typography>
                <Typography component="h1" variant="subtitle1">Este sitio garantiza que la información personal que usted envía cuenta con la
                    seguridad necesaria. Los datos ingresados por usuario no serán
                    entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales.
                    <strong> CursoInk</strong> reserva los derechos de cambiar o de modificar estos términos sin previo aviso.
                </Typography>
            </Grid>
            <Grid style={{ marginBottom: "3%" }}>
                <Typography component="h1" variant="caption">© CursoInk 2021. Todos los derechos reservados.
                    Prohibida su reproducción total o parcial.
                </Typography>
            </Grid>

        </Container >
    )
}
