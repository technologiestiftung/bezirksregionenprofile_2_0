<template>
  <div>
    <page-header></page-header>

    <v-row>
      <v-col cols="12" lg="8" class="grey lighten-4 pa-12">
        <div>
          <br />
          <h2>Über den Monitor</h2>
          <p>
            Der Berliner Bezirksregionen Monitor ist ein Projekt des Ideation & Prototyping Lab der Technologiestiftung Berlin. Es
            ist ein Prototyp für ein Tool, dass den Datenkoordinator*innen der einzelnen Bezirke ermöglicht, die
            Bezirksregionenprofile in einer webbasierten, interaktiven Anwendung den Bürger*innen zur Verfügung zu stellen. Die
            Daten der Kernindikatoren werden den Datenkoordinator*innen vom Amt für Statistik Berlin Brandenburg geliefert. Die
            Datenkoordinator*innen erstellen die Bezirksregionenprofile auf Basis der Kernindikatoren in einer vorgegeben Struktur
            von 14 Überpunkten:
          </p>
          <ol>
            <li>Kurzporträt der Bezirksregion</li>
            <li>Demografische Struktur und Entwicklung</li>
            <li>Soziale Situation</li>
            <li>Bildungssituation</li>
            <li>Gesundheitliche Situation</li>
            <li>Wirtschafts- und Gewerbestruktur</li>
            <li>Wohnsituation</li>
            <li>Soziale Infrastruktur</li>
            <li>Grüne Infrastruktur und öffentlicher Raum</li>
            <li>Mobilität</li>
            <li>Umwelt (Lärmbelastung / Luftbelastung / Bioklima)</li>
            <li>Förderprogramme und Projekte</li>
            <li>
              Partizipation: Strukturen der Akteursvernetzung und Bürgerbeteiligung
            </li>
            <li>Zusammenfassung: Potenziale und Herausforderungen</li>
          </ol>

          <br />
          <h2>Datengrundlage</h2>
          <p>
            Die Daten der Kernindikatoren stammen von xxx und sind hier verfügbar xxx. Die Datenprofile der einzelnen
            Bezirksregionen stammen von den jeweiligen Datenkoordinator*innen. Auf die ursprünglichen Profile wird auf der Seite
            der jeweiligen Bezirksregion verlinkt.
          </p>
          <br />

          <h2>Beschreibung der einzelnen Kernindikatoren</h2>
          <p>
            Die Kernindikatoren sind ein berlinweit abgestimmtes Indikatorenset, mit dem im Rahmen der integrierten
            Stadtteilentwicklung die Vergleichbarkeit der Ist-Situation und der Entwicklung in den Bezirksregionen bezirksintern
            und bezirksübergreifend gewährleistet werden soll. Die Kernindikatoren bilden dabei sozialräumliche Daten zur
            demografischen Struktur einer Bezirksregion ab und untersuchen u.a. Merkmale zu Armutsrisiken, Entwicklungsbedingungen
            für Kinder und Jugendliche oder aber auch Stabilität und Dynamik der Wohnbevölkerung einer Bezirksregion. Insgesamt
            gibt es 23 Kernindikatoren, die 6 Rubriken zugeordnet werden können. Der Berliner Bezirkregionen Monitor bildet
            wiederum 22 (E4 wird nicht erfasst) Kernidikatoren aus 5 Rubriken ab. Nachfolgend werden die 5 Rubriken und ihre
            dazugehörigen Kernindikatoren kurz beschrieben
          </p>

          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header>Wohnen</v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>
                  Die Rubrik Wohnen beschreibt die Merkmale der Bezirksregion als Wohnort.
                </p>
                <h5>Kernindikator A4 - Grünanlagen</h5>
                <p>
                  Gibt das Verhältnis zwischen öffentlichen Grünanlagen und Einwohner/innen an. Die Angabe erfolgt in Quadratmeter
                  pro Einwohner/in. Als öffentliche Grünanlagen werden dabei folgende Grünanlagen berücksichtigt: Grünanlagen in
                  Wohngebieten, Parks und Erholungsgebiete, Stadtplätze, Ufergrünzüge, Badewiesen und Kinderspielplätze. Nicht
                  eingerechnet werden die eintrittspflichtigen Anlagen (Britzer Garten, Botanischer Garten, Erholungspark Marzahn,
                  Naturpark Schöneberger Südgelände, Botanische Anlage Blankenfel-de, Tierpark, Zoologischer Garten).
                </p>
                <h5>Kernindikator A5 - Spielplatzfläche</h5>
                <p>
                  Gibt das Verhältnis zwischen anrechenbaren öffentlichen Spielplätzen und Einwohner/innen an. Die Angabe erfolgt
                  in Quadratmeter pro Einwohner/in. Angerechnet auf die Versorgung mit öffentlichen Spielplatzflächen werden alle
                  Spielplatzflä-chen, die vom Land Berlin unterhalten werden. Spielanlagen auf Schulhöfen werden angerechnet, wenn
                  ihre Benutzung außerhalb der Schulzeit gesichert ist. Nicht angerechnet werden grundsätzlich die Waldspielplätze
                  und die als Kinderbauernhöfe geführten Anlagen. Betrachtet wird die
                  <b>Nettospielfläche</b>, das heißt direkt bespielbare Flächen ohne das Rahmengrün. In Berlin gilt gemäß § 4
                  Kinderspielplatzgesetz ein Richtwert von 1,0 qm nutzbarer Fläche (Nettospielfläche) je EW.
                </p>
                <h5>
                  Kernindikator A6 - Kinderbetreeung für Kinder unter 7 Jahren
                </h5>
                <p>
                  Gibt an, wie viel Prozent der Kinder unter 7 Jahren eine öffentlich geförderte Kindertagesbetreuung in
                  Kindertageseinrichtungen oder Kindertagespflegeeinrichtungen in Anspruch nehmen. Die Zuordnung bezieht sich auf
                  den Wohnort des Kindes, nicht auf den Standort der Einrichtung. Zu den öffentlich geförderten
                  Kindertagsbetreuungen zählen in Berlin Kindertageseinrichtungen (Kitas). Dazu gehören Krippen und Kindergärten.
                  Seit dem 01.08.2018 ist die Kita für alle kostenfrei und nur der Verpflegungsanteil in Höhe von 23 € ist
                  weiterhin zu zahlen. Im Zusammenspiel mit der Änderung des Schuleintrittalters (Eintritt um 3 Monate verschoben
                  und nur möglich, wenn Kind zum 30. September eines Jahres das 6. Lebensjahr vollendet) ist in Zukunft mit einem
                  Anstieg der Kindertagsbetreuungen zu rechnen.
                </p>
                <h5>Kernindikator A7 - Jugendfreizeiteinrichtungen</h5>
                <p>
                  Gibt an, für wie viel Prozent der Einwohner/innen im Alter von 6 bis unter 25 Jahren Plätze in öffentlichen und
                  öffentlich geförderten Jugendfreizeiteinrichtungen zur Verfügun stehen. Der Begriff „Jugendfreizeiteinrichtung“
                  (JFE) umfasst im Wesentlichen Orte der Offenen Kinder- und Jugendarbeit, d.h. Räume und Häuser mit einer
                  Vielzahl unterschiedlicher Angebote wie bspw. Projekte, Gruppenarbeiten, Workshops oder Veranstaltungen.
                  Hauptzielgruppe sind die ca. 10- bis unter 18-Jährigen. Gemäß Richtwert sollen für 11,4 Prozent der 6 bis unter
                  25-Jährigen Plätze in öffentlichen und öffentlich geförderten JFE's bereitgestellt werden. Aus diesem Indikator
                  lassen sich keine Aussagen im Hinblick auf Qualitäten, Personalsituation, interkulturelle Öffnung der
                  Einrichtungen etc. ableiten.
                </p>
                <h5>Kernindikator A8 - Straftaten</h5>
                <p>
                  Gibt an, wie viele kiezbezogene Straftaten im Laufe eines betracheten Kalenderjahres je 100 Einwohner/innen
                  begangen wurden. Die Angabe erfolgt in Häufigkeitszahl (HZ) je 100 EW. Als kiezbezogene Straftaten der
                  Polizeilichen Krimimalstatistik (PKS) in Berlin werden aufgenommen: Automateneinbruch, Bedrohung, Einbruch in
                  Kita/Jugendheim/Schule, Freiheitsberaubung, Keller- und Bodeneinbruch, Körperverletzung und Körperverletzung in
                  der Öffentlichkeit, Misshandlung von Kindern und Schutzbefohlenen, Nötigung, Sachbeschädigung an Kfz, Widerstand
                  gegen Vollstreckungsbeamte und Wohnungseinbruch. Berücksichtig werden nur **kiezbezogene Straftaten mit
                  Tatort**, wobei 90-95% aller in der PKS registrierten Straftaten zu den Bezirkregionen und Planungsräumen
                  zugeordnet werden können.
                </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Demografie</v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>
                  Die Rubrik Demografie beschreibt die demografische Struktur der Wohnbevölkerung.
                </p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <br />
          <br />
          <h2>Bezirksregionenprofile</h2>
          <h3>Rahmen für integrierte Entwicklung</h3>
          <p>
            Die Bezirksregionenprofile sind ein wesentlicher Baustein für die Umsetzung der Sozialraumorientierung im Kontext der
            Rahmenstrategie Soziale Stadt(teil)Entwicklung. Sie beschreiben den Ist-Zustand und die Entwicklung der
            Bezirksregionen. Sie bilden eine einheitliche und (berlinweit) abgestimmte Arbeits- und Verständigungsgrundlage für
            ein sozialraumorientiertes, gemeinsames und abgestimmtes Handeln von Verwaltung, Politik, lokalen Akteur_en und
            Bewohner_innen. Mit ihnen wird ein Überblick über die vielschichtigen Herausforderungen und ungleichzeitigen
            Entwicklungsprozesse auf Bezirksregionenebene wie auch ein aktueller Überblick über die Fachplanungen ermöglicht. Das
            Bezirksregionenprofil kann dabei keine fachlichen Entscheidungen und politischen Aushandlungsprozesse über Maßnahmen
            und Mittelverteilung ersetzen. Es soll vielmehr ein qualifiziertes Blitzlicht auf die aktuelle Situation in der
            Bezirksregion und die verschiedenen stadtentwicklungspolitischen Bereiche werfen. Das betrifft neben den sozialen auch
            die baulichen, wirtschaftlichen und infrastrukturellen Komponenten.
          </p>

          <br />
          <h3>Inhalt der Bezirksregionenprofile</h3>
          <p>
            Bezirksregionenprofile enthalten eine Analyse (Teil I – Analyse und Beschreibung) und einen konzeptionellen Teil (Teil
            II – Ziele und Maßnahmen). Die Basis des Analyseteils Teil I sind sog. Kernindikatoren und statistische Grunddaten des
            Amtes für Statistik Berlin-Brandenburg. Diese Daten werden zwischen den Senatsverwaltungen und Bezirken Berlins
            abgestimmt, in einem Datenpool zusammengetragen und jährlich zur Verfügung gestellt. Der konzeptionelle Teil II ist
            darauf ausgerichtet Maßnahmen und Ziele zum einen mit den Fachämtern und zum anderen mit lokalen Akteuren sowie den
            Bürger_innen in einer Bezirksregion zu erarbeiten. Dadurch kann eine übergeordnete und interdisziplinäre Betrachtung
            der Bedarfe und Potenziale vorgenommen werden und integrierte Zielsetzungen festgelegt werden.
          </p>

          <br />
          <h3>Gliederung</h3>
          <p>
            Die Gliederung der Profile ist in Berlin einheitlich. Damit wird eine innerbezirkliche und berlinweite
            Vergleichbarkeit ermöglicht. Neben den statistischen Fakten enthält das Bezirksregionenprofil weitere, lokal erhobene,
            Daten und fachliche Stellungnahmen. Die einzelnen Bausteine des Bezirksregionenprofils werden ämterübergreifend
            erarbeitet („integriertes Profil“). Die Erstellung erfolgt stufenweise.
          </p>

          <br />
          <h3>Fortschreibung</h3>
          <p>
            Die Fortschreibung des Teil I der Bezirksregionenprofile erfolgt in einem zweijährigen Rhythmus, die Federführung
            liegt bei der Datenkoordination der Organisationseinheit Sozialraumorientierte Planungskoordination.
          </p>
          <p>
            <a
              href="https://www.berlin.de/ba-tempelhof-schoeneberg/politik-und-verwaltung/service-und-organisationseinheiten/sozialraumorientierte-planungskoordination/bzrp-677061.php"
              >Quelle: Bezirksamt Tempelhof-Schöneberg</a
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
  data() {
    return {
      showMore: false
    }
  }
}
</script>
