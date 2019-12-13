<template>
  <div>
    <!-- breadcrumbs only necessary for the app with whole Berlin. Not with single 'Bezirke' -->
    <!--<v-breadcrumbs :items="breadcrumbItems" class="mb-8" large></v-breadcrumbs>-->

    <page-header></page-header>

    <v-row>
      <v-col cols="12" xl="8">
        <div>
          <h1>Barrierefreiheitserklärung</h1>

          <h2 id="institution">Öffentliche Stelle / Geltungsbereich</h2>
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

          <h2 id="create">Wann wurde die Erklärung zur Barrierefreiheit erstellt bzw. aktualisiert?</h2>
          <p>
            Diese Erklärung wurde am 9.12.2019 erstellt bzw. überarbeitet.
          </p>
          <p>
            Die Überprüfung der digitalen Barrierefreiheit wurde durchgeführt von der oben aufgeführten öffentlichen Stelle.
          </p>

          <h2 id="contactbfe">
            Wen können Sie bei Anmerkungen oder Fragen zur digitalen Barrierefreiheit (Feedbackoption) kontaktieren?
          </h2>
          <p>Kontakt zur Ansprechperson der öffentlichen Stelle:</p>
          <p>
            Name: Ewelina Raab<br />
            E-Mail: <a href="mailto:digitale_barrierefreiheit@ba-ts.berlin.de">digitale_barrierefreiheit@ba-ts.berlin.de</a><br />
            Telefon: (030) 90277-2110
          </p>

          <h2 id="contactbfelb">Kontakt zur Landesbeauftragten für digitale Barrierefreiheit</h2>
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
