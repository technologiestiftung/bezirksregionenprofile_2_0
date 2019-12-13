<template>
  <div>
    <!-- breadcrumbs only necessary for the app with whole Berlin. Not with single 'Bezirke' -->
    <!--<v-breadcrumbs :items="breadcrumbItems" class="mb-8" large></v-breadcrumbs>-->

    <page-header></page-header>

    <v-row>
      <v-col cols="12" xl="8">
        <div>
          <h1>Impressum</h1>

          <div>
            <div>
              <h2>
                Redaktionelle Verantwortung
              </h2>
              <p>
                Das Informationsangebot ist Teil des Stadtinformationssystems von Berlin.<br />
                Die redaktionelle Verantwortung für den Internetauftritt unter
              </p>
              <p>
                www.berlin.de/bezirksregionenprofile-ts
              </p>
              <p>
                liegt beim Bezirksamt Tempelhof-Schöneberg von Berlin, Organisationseinheit Sozialraumorientierte
                Planungskoordination (OE SPK).
              </p>
              <p>
                <strong
                  >Bezirksamt Tempelhof-Schöneberg von Berlin, Organisationseinheit Sozialraumorientierte Planungskoordination (OE
                  SPK)</strong
                ><br />
                vertreten durch den<br />
                Datenkoordinator Ulrich Binner<br />
                Rathaus Schöneberg<br />
                John-F.-Kennedy-Platz<br />
                10825 Berlin<br />
              </p>
              <p>
                <strong>Koordinierender Webredakteur des Bezirksamtes Tempelhof-Schöneberg</strong><br />
                Oliver Schulz<br />
                Tel.: 030 90277 6380<br />
                Fax.: 030 90277 2220<br />
                <strong
                  ><a href="mailto:web-pressestelle@ba-ts.berlin.de" title="E-Mail bezüglich des Internetauftritts"
                    >E-Mail an den koordinierenden Webredakteur</a
                  ></strong
                >
              </p>

              <div>
                <h2>
                  Behördlicher Datenschutzbeauftragter
                </h2>
                <p>
                  Rathaus Schöneberg<br />
                  John-F.-Kennedy-Platz<br />
                  10825 Berlin<br />
                  Telefon: 90277 4746<br />
                  Fax: 90277 7862<br />
                  <strong
                    ><a href="mailto:post.datenschutz@ba-ts.berlin.de" title="E-Mail an den behördlichen Datenschutzbeauftragten"
                      >E-Mail an den behördlichen Datenschutzbeauftragten</a
                    ></strong
                  >
                </p>
              </div>

              <h2>
                Technischer Betrieb
              </h2>
              <p>
                <a
                  href="https://www.technologiestiftung-berlin.de/"
                  target="_blank"
                  title="Link zur Technologiestiftung Berlin (Öffnet in neuem Fenster)"
                  >Technologiestiftung Berlin</a
                ><br />
                Grunewaldstraße 61-62<br />
                10825 Berlin
              </p>
              <p>
                Tel.: +49 30 209 69 99-00 E-Mail:
                <a href="mailto:info@technologiestiftung-berlin.de" title="E-Mail an Technologiestiftung Berlin"
                  >info@technologiestiftung-berlin.de</a
                >
              </p>
              <h2>
                Datenschutz
              </h2>
              <p>
                Bitte beachten Sie hierzu die unsere
                <a href="/datenschutz" title="Link zur Datenschutzerklärung">Datenschutzerklärung!</a>
              </p>
              <h2>
                Haftungsausschluss
              </h2>
              <h3>
                Haftung für Inhalte
              </h3>
              <p>
                Die Inhalte der Internetseite werden mit größter Sorgfalt erstellt. Dennoch kann das Bezirksamt
                Tempelhof-Schöneberg keine Gewähr für die Aktualität, Korrektheit und Vollständigkeit der bereitgestellten Inhalte
                übernehmen.<br />
                Gemäß § 7 Abs. 1 Telemediengesetz (<span class="caps">TMG</span>) ist das Bezirksamt Tempelhof-Schöneberg als
                Diensteanbieter für eigene Inhalte auf dieser Seite nach den allgemeinen Gesetzen verantwortlich. Allerdings
                besteht nach § 7 Abs. 2 <span class="caps">TMG</span> zufolge für das Bezirksamt Tempelhof-Schöneberg als
                Diensteanbieter im Sinne §§ 8 &#8211; 10 <span class="caps">TMG</span> keine Verpflichtung, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtwidrige
                Tätigkeit hinweisen. Wenn dem Bezirksamt Tempelhof-Schöneberg jedoch Rechtsverstöße bekannt werden, werden die
                entsprechenden Inhalte umgehend entfernt. Eine diesbezügliche Haftung besteht allerdings erst ab dem Zeitpunkt der
                Kenntnis konkreter Rechtsverletzungen.
              </p>
              <h2>
                Urheberrecht
              </h2>
              <p>
                Das Layout der Seiten des Bezirksamts Tempelhof-Schöneberg, die verwendeten Grafiken sowie die Sammlung der
                Beiträge sind urheberrechtlich geschützt. Die Seiten dürfen ausschließlich zu privatem Gebrauch vervielfältigt
                werden. Textliche und grafische Änderungen sowie die öffentliche Verbreitung sind nicht erlaubt.
              </p>
            </div>
          </div>
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
