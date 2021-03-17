import { Container, makeStyles, Typography } from "@material-ui/core"
import moment from "moment"
import Image from "next/image"
import { formatDate } from "utils/utils"

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  indented: {
    paddingLeft: theme.spacing(2),
  },
  signature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))

interface Props {
  name: string
  identityDocument: string
}
export default function SafeConduct(props: Props) {
  const styles = useStyles()
  const submissionDate = formatDate(moment(), { withYear: true })

  return (
    <Container>
      <Typography
        align="center"
        variant="h5"
        component="h1"
        className={styles.title}
      >
        Declaración responsable para facilitar la movilidad relacionada con
        actividades de formación
      </Typography>
      <Typography gutterBottom>
        D.ª África Rodríguez Nieves, con DNI 31685789T, actuando como
        representante de la Asociación Cultural Los Guindales (CIF: G93505725).
      </Typography>
      <div className={styles.indented}>
        <Typography>Datos de contacto de la asociación:</Typography>
        <ul>
          <li>Domicilio: C/ Los Barrancos 2, Algatocín, Málaga.</li>
          <li>Teléfono: 664 368 784</li>
          <li>Correo electrónico: guindaluc@yahoo.es</li>
        </ul>
      </div>
      <Typography gutterBottom>Declara responsablemente:</Typography>
      <Typography gutterBottom className={styles.indented}>
        Que D/D.ª <b>{props.name}</b> con documento de identidad{" "}
        <b>{props.identityDocument}</b> es socio/a de la Asociación Cultural Los
        Guindales, en cuya sede realizará una formación los días 13 y 14 de
        marzo de 2021.
      </Typography>
      <Typography gutterBottom className={styles.indented}>
        Para que conste a los efectos de facilitar los trayectos necesarios
        entre su lugar de residencia y el lugar de formación.
      </Typography>
      <Typography gutterBottom>En Algatocín, a {submissionDate}.</Typography>
      <div className={styles.signature}>
        <Typography>Fdo.: África Rodríguez Nieves</Typography>
        <Image src="/firma_africa.jpg" width={1624 / 5.5} height={1266 / 5.5} />
      </div>
    </Container>
  )
}
