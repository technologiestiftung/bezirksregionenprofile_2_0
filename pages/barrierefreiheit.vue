<template>
  <div>
    <v-breadcrumbs :items="breadcrumbItems" class="mb-8" large></v-breadcrumbs>

    <page-header></page-header>

    <v-row>
      <v-col cols="12" xl="8">
        <div>
          <h2>Barrierefreiheitserklärung</h2>

          <h3 id="institution">Öffentliche Stelle / Geltungsbereich</h3>
          <p>
            Beziksamt Tempelhof-Schöneberg
          </p>
          <p>
            Wir bemühen uns, unseren Webauftritt barrierefrei zu gestalten. Die Erklärung zur digitalen Barrierefreiheit wird im
            Gesetz über die barrierefreie Informations- und Kommunikationstechnik Berlin (BIKTG Bln) verlangt. Die technischen
            Anforderungen zur Barrierefreiheit ergeben sich aus der aktuellen BITV.
          </p>
          <p>
            Diese Erklärung zur digitalen Barrierefreiheit gilt für das Angebot Webauftritt
            https://www.berlin.de/bezirksregionenprofile-ts/.
          </p>

          <h3 id="create">Wann wurde die Erklärung zur Barrierefreiheit erstellt bzw. aktualisiert?</h3>
          <p>
            Diese Erklärung wurde am xx.12.2019 erstellt bzw. überarbeitet.
          </p>
          <p>
            Die Überprüfung der digitalen Barrierefreiheit wurde durchgeführt von der oben aufgeführten öffentlichen Stelle.
          </p>

          <h3 id="accessibility">Wie barrierefrei ist das Angebot?</h3>
          <p>
            Dieser Webauftritt / Diese Anwendung ist nur teilweise barrierefrei. Es werden nur teilweise die Anforderungen der
            aktuellen BITV erfüllt.
          </p>

          <h3 id="components">Welche Bereiche sind nicht barrierefrei?</h3>
          <p>Die nachstehend aufgeführten Bereiche sind aus folgenden Gründen nicht barrierefrei:</p>

          <h4>Unvereinbarkeit mit aktueller BITV</h4>
          <p>Teilbereiche, die nicht barrierefrei sind:</p>

          <p>TODO</p>

          <h3 id="contactbfe">
            Wen können Sie bei Anmerkungen oder Fragen zur digitalen Barrierefreiheit (Feedbackoption) kontaktieren?
          </h3>
          <p>Kontakt zur Ansprechperson der öffentlichen Stelle:</p>
          <p>
            Name: Ewelina Raab<br />
            E-Mail: <a href="mailto:digitale_barrierefreiheit@ba-ts.berlin.de">digitale_barrierefreiheit@ba-ts.berlin.de</a><br />
            Telefon: (030) 90277-2110
          </p>

          <h3 id="contactbfelb">Kontakt zur Landesbeauftragten für digitale Barrierefreiheit</h3>
          <p>
            Wenn Ihre Kontaktaufnahme mit der öffentlichen Stelle nicht erfolgreich war, können Sie sich an die Landesbeauftragte
            für digitale Barrierefreiheit wenden.<br />
            <a
              target="_blank"
              href="https://www.berlin.de/sen/inneres/moderne-verwaltung/digitale-barrierefreiheit/landesbeauftragte/formular.804443.php"
              >Link zum Kontaktformular</a
            ><br />
            <a
              target="_blank"
              href="https://www.berlin.de/sen/inneres/moderne-verwaltung/digitale-barrierefreiheit/landesbeauftragte/"
              >Weitere Informationen zur Landesbeauftragten für digitale Barrierefreiheit</a
            >
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import pageHeader from '~/components/pageHeader.vue'

export default {
  components: {
    pageHeader
  },
  head() {
    return {
      title: 'Impressum',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ]
    }
  },
  data() {
    return {
      showMore: false,
      breadcrumbItems: [
        {
          to: '/',
          text: 'Tempelhof-Schöneberg',
          disabled: false,
          exact: true
        },
        {
          text: 'Impressum',
          disabled: true,
          exact: true
        }
      ]
    }
  }
}
</script>
