<template>
  <div>
    <v-breadcrumbs :items="breadcrumbItems" class="mb-8" large></v-breadcrumbs>

    <page-header></page-header>

    <v-row>
      <v-col cols="12" xl="8">
        <div>
          <h2>Datenschutzerklärung</h2>

          <div>
            <h3>I. Verantwortliche/r</h3>
            <p>
              Verantwortliche/r im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler Datenschutzgesetze der
              Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
            </p>
            <dt>Bezirksamt Tempelhof-Schöneberg von Berlin</dt>
            <p>John-F.-Kennedy-Platz, 10825 Berlin, <br />Tel: 90277-0</p>
          </div>

          <div>
            <h3>II. Name und Anschrift des DSB (Datenschutzbeauftragten)</h3>
            <p>
              Der/die Datenschutzbeauftragte des Verantwortlichen ist:
            </p>
            <dt>E-Mail:</dt>
            <dd><a href="mailto:post.datenschutz@ba-ts.berlin.de">post.datenschutz@ba-ts.berlin.de</a></dd>
            <dt>Anschrift:</dt>
            <dd>
              <div>
                <p>
                  Bezirksamt Tempelhof-Schöneberg<br />
                  John-F.-Kennedy-Platz, 10825 Berlin
                </p>
              </div>
            </dd>
            <h4>Bezirksamt Tempelhof-Schöneberg von Berlin</h4>
            <p>John-F.-Kennedy-Platz, 10825 Berlin, <br />Tel: 90277-0</p>
          </div>
        </div>

        <div>
          <h3>III. Zentrale Dienste des Webportals</h3>
          <p>
            Betreibergesellschaft für die digitalen Bezirksregionenprofile des Bezirks Tempelhof-Schöneberg ist die
            Technologiestiftung Berlin, Grunewaldstraße 61-62, 10825 Berlin.
          </p>
          <p>
            Für den technischen Betrieb dieser Seite und alle damit einhergehenden Datenverarbeitungsvorgänge ist
            Verantwortliche/r im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler Datenschutzgesetze der
            Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen die:
          </p>

          <p>Technologiestiftung Berlin<br />Grunewaldstraße 61-62<br />10825 Berlin</p>

          <p>Der Datenschutzbeauftragte der Technologiestiftung Berlin ist wie folgt erreichbar:</p>

          <p>Technologiestiftung Berlin<br />Grunewaldstraße 61-62<br />10825 Berlin</p>
          <p>
            Michael Scherer <br />Tel.: 030 20 96 99 951<br /><a
              href="mailto:scherer@technologiestiftung-berlin.de"
              title="Opens internal link in current window"
              class="mail"
              >scherer(at)technologiestiftung-berlin.de</a
            >
          </p>
        </div>

        <div>
          <h3>IV. Rechte der betroffenen Person</h3>
          <div>
            <p>Sie haben gegenüber der verantwortlichen Stelle das Recht:</p>
            <ol>
              <li>
                auf Auskunft über die Verarbeitung ihrer personenbezogenen Daten (dazu gehören auch Auskünfte über Zweck,
                Empfänger und Dauer der Speicherung) nach Art. 15 DSGVO,
              </li>
              <li>auf Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
              <li>auf Löschung gemäß Art. 17 DSGVO,</li>
              <li>auf Einschränkung der Verarbeitung und Datenübertragbarkeit (Art. 18 und 20 DSGVO) sowie</li>
              <li>
                der Verarbeitung Ihrer Daten jederzeit zu widersprechen (Art. 21 DSGVO). Legen Sie Widerspruch ein, werden Ihre
                personenbezogenen Daten nicht mehr verarbeitet. Eine Ausnahme besteht, soweit zwingende schutzwürdige Gründe
                bestehen, die gegenüber Ihren Interessen überwiegen.
              </li>
            </ol>

            <p>
              Eine einmal erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden. Die Rechtmäßigkeit
              der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung wird dadurch nicht berührt. In diesem Fall
              können wir Ihnen möglicherweise mit Ihrem Anliegen nicht mehr helfen. Der Widerruf ist zu richten an den
              behördlichen Datenschutzbeauftragten an die in Ziff. II genannte Kontaktadresse.
            </p>

            <p>
              Zur Wahrung aller in dieser Ziffer genannten Rechte kann sich jeder Betroffene an den/die Datenschutzbeauftragte/n
              (siehe Ziffer II) wenden.
            </p>

            <p>
              Zudem können Sie sich - wenn Sie der Auffassung sind, dass bei der Verarbeitung Ihrer Daten datenschutzrechtliche
              Vorschriften nicht beachtet werden - mit einer Beschwerde an die zuständige Aufsichtsbehörde wenden (Art. 77 DSGVO).
              Betroffene können ihre Beschwerde an die Behörde ihres Wohnsitzes, grundsätzlich aber auch an jede andere
              Datenschutzaufsichtsbehörde richten. Die zuständige Datenschutzaufsichtsbehörde ist die Berliner Beauftragte für
              Datenschutz und Informationsfreiheit, die sie wie folgt kontaktieren können:
            </p>

            <p>
              Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
              Friedrichstr. 219<br />
              10969 Berlin<br />
              Tel.: +49 30 13889-0<br />
              E-Mail: mailbox@datenschutz-berlin.de
            </p>
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
      title: 'Datenschutz',
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
          text: 'Datenschutz',
          disabled: true,
          exact: true
        }
      ]
    }
  }
}
</script>
