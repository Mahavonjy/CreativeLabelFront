import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";

function LegalNotices(props) {

    const isMounted = useRef(false);
    const lightModeOn = useSelector(state => state.Home.lightModeOn);

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div aria-disabled={"false"} className="modal fade p-t-b-50 Offers" id="legaleNotices" role="dialog">
            <div className="modal-dialog" role="document" style={{width: "100%"}}>
                <div className={lightModeOn ? "modal-content bg-white border-0" : "modal-content bg-dark border-0"}>
                    <div className="modal-header justify-content-center">
                        <h1 className="pt-2 bolder">CONDITIONS GÉNÉRALES D'UTILISATION ET DE VENTE</h1>
                        <button type="button"
                                className="closeOffers ml-4 transparent border-0"
                                data-dismiss="modal"
                                aria-label="Close">
                            <i className="icon-close s-24 text-red"/>
                        </button>
                    </div>
                    <div className="modal-body text-left p-5">
                        <p className="mt-4 mb-4">
                            Les présentes Conditions Générales de Vente (ci-après les « CGV ») sont proposées par
                            SARL, en cours d'immatriculation, dont le siège social est sis au 15 Boulevard du port,
                            95000 Cergy (ci-après «LE VENDEUR»).
                        </p>
                        <span className="mt-4 mb-4">
                            LE VENDEUR propose, par l’intermédiaire de son site internet http://www.islcreative.ml
                            (ci-après le «<strong>Site</strong><span>&nbsp;</span><span>&nbsp;</span>»), (ci-après les
                            <strong>&nbsp;</strong>«<strong>&nbsp;<span>Produits et services</span>&nbsp;</strong>» ).
                        </span>
                        <p className="mt-4 mb-4"><span>Chaque client reconnaît avoir eu connaissance,
                            de manière lisible et compréhensible,des présentes CGUV ainsi que de l’ensemble
                            des informations nécessaires à
                            l’exécution des présentes, conformément aux articles L.111-1 à L.111-8 du Code de
                            la consommation, préalablement à la passation de sa commande et avant toute
                            conclusion de son contrat avec<span>&nbsp;</span><span></span><span>&nbsp;
                        </span>SARL en cours d'immatriculation.</span></p>

                        <h2 className="text-center text-red bolder mt-4 mb-4">APPLICATION ET OPPOSABILITE DES CGUV</h2>
                        <p className="mt-4 mb-4">
                            Les présentes CGUV s’appliquent à toute utilisation du Site ainsi qu’à toute
                            commande de Produits et services par tout client, personne physique, agissant à des fins
                            qui n'entrent pas dans le cadre de son activité professionnelle ou tout client, personne
                            physique ou morale, agissant dans le cadre de son activité commerciale, industrielle,
                            artisanale ou libérale (ci-après le « <strong>Client</strong> ») réalisée sur le Site, à
                            compter du 01 avril 2020.</p><p>Les présentes CGUV ont pour objet de définir les
                        conditions de la commande des Produits et services, et de déterminer les droits et
                        obligations respectifs de chacune des parties dans le cadre de la fourniture des
                        Produits et services.</p><p>Sauf accord écrit contraire des parties, ces CGUV priment
                        sur toutes clauses contraires issues de conditions générales antérieurement rédigées, et
                        s’appliquent ainsi à l’exclusion de toute autre convention.</p><p>Les présentes CGUV
                        doivent être considérées comme faisant partie intégrante et essentielle du contrat
                        conclu entre LE VENDEUR et chacun de ses Clients.</p><p>Ces CGUV sont systématiquement
                        notifiées au Client lors de la création de son compte personnel sur le Site et de sa
                        commande sur le Site. Chaque Client doit nécessairement en prendre connaissance et les
                        accepter afin de pouvoir valider sa commande sur le Site. Cette acceptation consiste à
                        cocher la case correspondant à la phrase d’acceptation des présentes CGUV, telle que,
                        par exemple, « <em>Je reconnais avoir lu et accepté l’ensemble des conditions générales
                            de vente publiées sur le Site</em> ». Le fait de cocher cette case sera réputé avoir
                        la même valeur qu’une signature manuscrite de la part du Client.</p><p>En cas de
                        modification et/ou adaptation des présentes CGUV par LE VENDEUR, seule la version en
                        vigueur au jour de la commande du Client sur le Site sera valablement applicable. Le
                        Client sera informé des éventuelles modifications apportées aux présentes, lors de sa
                        connexion ultérieure sur le Site, par une notification publiée sur le Site.</p><p>Le
                        fait que LE VENDEUR ne se prévale pas, à un moment donné, de l’une quelconque des
                        dispositions des présentes CGUV ne peut être interprété comme valant renonciation à s’en
                        prévaloir ultérieurement.</p><p>LE VENDEUR invite chaque Client à lire attentivement les
                        présentes CGUV, à les imprimer et/ou les sauvegarder sur tout support durable, avant de
                        procéder à la commande de tout Produit ou service sur son Site.</p>

                        <h2 className="text-center text-red bolder mt-4 mb-4">ACCÈS ET DISPONIBILITÉ DU SITE</h2>
                        <p className="mt-4 mb-4">
                            LE VENDEUR propose un accès gratuit à son Site, le Client demeurant
                            en toute hypothèse responsable de son équipement informatique et de sa connexion à Internet,
                            dont les coûts sont à sa charge.</p><p>L’accès au Site peut être réalisé : </p><p>•
                        depuis un ordinateur ou un terminal équivalant disposant d'un accès à un ou plusieurs réseaux de
                        télécommunications permettant l'accès au réseau Internet et d'un logiciel de navigation
                        sur le réseau Internet (de type Internet Explorer, Mozilla Firefox, etc.) ;</p><p>• un
                        terminal téléphonique disposant d'un accès à un réseau de télécommunications permettant
                        l'accès au réseau Internet(connexion 3G, 4G, Edge, wifi etc.).</p><p>LE VENDEUR fait ses
                        meilleurs efforts pour rendre leSite accessible en permanence, sous réserve des
                        opérations de maintenance nécessaires au bon fonctionnement du Site ou des serveurs sur
                        lesquels il est hébergé. En cas d’interruption pour maintenance, LE VENDEUR ne pourra
                        être tenu pour responsable de l’impact éventuel de cette indisponibilité sur les
                        activités du Client.</p><p>Le Client est averti des aléas techniques inhérents à
                        l’Internet et des interruptions d’accès qui peuvent en résulter. En conséquence, LE
                        VENDEUR ne pourra être tenu responsable des éventuelles indisponibilités ou
                        ralentissements du Site. </p><p>Le Client est informé que les serveurs du VENDEUR sont
                        hébergés par la société Google.</p><p>Tout manquement du Client aux obligations lui
                        incombant en vertu des présentes CGUV sera susceptible d’entrainer la suspension ou
                        l’interdiction de l’accès du Client au Site.</p>

                        <h2 className="text-center text-red bolder mt-4 mb-4">ACCÈS ET DISPONIBILITÉ DU SITE</h2>
                        <p className="mt-4 mb-4">Les commandes de Produit(s) ou service(s) sont réalisées par
                            l’intermédiaire du Site.</p><p>
                        </p>La détention d’un compte utilisateur personnel est possible mais n’est
                        pas un préalable nécessaire et obligatoire afin de procéder à la commande des Produits
                        et services sur le Site.<p>La création d'un compte utilisateur se fait grâce aux champs
                        obligatoires suivants : Nom, prénom, adresse, email. Le compte utilisateur permet
                        d'accéder à une interface personnalisée, de gérer son profil et ses commandes.
                        Toutefois en cas d'information erronée, le client peut ne pas recevoir d'email ou
                        rencontrer d'autres difficultés pour passer, suivre ou recevoir sa commande.</p>
                        <p></p><p>Le Client choisit directement sur le Site le(s) Produit(s) ou service(s) qu’il
                        souhaite commander. LE VENDEUR s’efforce de fournir des visuels et des descriptions
                        les plus fidèles possibles aux Produits et services. Toutefois, ces visuels et
                        textes d’illustration n’étant pas contractuels, le Client ne saurait engager la
                        responsabilité du VENDEUR à ce titre.</p><p>Le Client est tenu de renseigner un
                        certain nombre d’informations le concernant en vue de valider sa commande. Toutes
                        les commandes doivent être dûment remplies et doivent contenir ces informations
                        strictement nécessaires à la commande. Le Client est responsable de la véracité, de
                        l’exactitude et de la pertinence des données fournies.</p><p>Le Client pourra
                        procéder à des changements, des corrections, des ajouts ou même annuler sa commande,
                        et ce, jusqu'à la validation de celle-ci sur la page récapitulative de commande,
                        avant le paiement.</p>

                        <h2 className="text-center text-red bolder mt-4 mb-4">PRIX ET MODALITES DE PAIEMENT</h2>
                        <h3 className="text-center text-red bolder mt-4 mb-4">PRIX</h3>
                        <div className="mt-4 mb-4">
                            <p><span>L’accès au Site ainsi qu’à la présentation des<span>
                            <span>&nbsp;<span>Produits et services</span></span></span><span>&nbsp;</span>
                            est gratuit pour le Client. Seule la commande d’un ou plusieurs <span>Produits et services
                        </span> fera l’objet d’un règlement par ce dernier.</span>
                        </p><p><span><span>Les prix des <span>Produits et services</span>
                            sont mentionnés sur le Site en euros et <span><span>toutes taxes comprises</span>
                        </span>. Les prix applicables sont ceux valables au jour de la commande sur
                            le Site par le Client. Les prix des <span>Produits livrés et services fournis</span>
                            peuvent varier selon le lieu de livraison, <span><span><span><span>les prix de Produits
                                à destination hors Union Européenne n’étant pas soumis à la TVA</span></span>
                            </span></span><span>.</span>&nbsp;</span></span>
                        </p><p><span><span><span>Les prix des <span>Produits et services</span>
                            et les éventuels coûts supplémentaires liés à la commande sont indiqués,
                            de manière claire et compréhensible, sur le récapitulatif de la commande.
                            <strong>Avant de passer la commande, le Client est tenu de confirmer ce récapitulatif.
                            </strong></span></span></span>
                        </p>
                        </div>

                        <h3 className="text-center text-red bolder mt-4 mb-4">Modalités de paiement</h3>
                        <p className="mt-4 mb-4">Les prix seront facturés sur la base des tarifs
                            en vigueur au moment de la commande.
                            Une facture récapitulant l’ensemble des Produits et services commandés par le Client
                            ainsi que leur coût respectif sera systématiquement adressée à ce dernier.</p><p>Le
                        Client réglera le prix, directement sur le Site, et impérativement avant toute
                        réalisation par LE VENDEUR, et ce, conformément au processus prévu à cet effet.</p><p>LE
                        VENDEUR utilise un système de paiement sécurisé tiers Stripe fourni par </p><p>Le
                        règlement par le Client est un préalable nécessaire à la validation de sa commande.</p>
                        <p>Le défaut de paiement à l’échéance entraînera automatiquement, sans mise en demeure
                            préalable et de plein droit, la suspension ou l’invalidation de la commande du
                            Client, sans préjudice de toute autre voie d’action
                        </p>

                        <h3 className="text-center text-red bolder mt-4 mb-4">DROIT DE RETRACTATION</h3>
                        <p className="mt-4 mb-4">Le Client consommateur dispose d'un délai de quatorze (14)
                            jours francs à compter de
                            la livraison des Produits pour exercer son droit de rétractation dans les conditions en
                            vigueur visées par le Code de la consommation, sans avoir à justifier d’un quelconque
                            motif ni à payer de pénalités.</p><p>S'il entend exercer son droit de rétractation, le
                        Client consommateur doit informer LE VENDEUR de sa décision de se rétracter du contrat
                        soit :<br/> • Par le biais du formulaire mis à sa disposition sur le Site, et plus
                        précisément, sur son compte client personnel, et en fin des présentes, en Annexe 1 ;
                        <br/> OU<br/> •
                        en présentant toute autre déclaration explicite et non équivoque à cet effet
                        (par exemple, une lettre envoyée par courrier recommandé avec accusé de
                        réception).</p><p>En tout état de cause, le Client doit indiquer une volonté de
                        se rétracter dénuée d'ambiguïté et non équivoque.</p><p>En cas de rétractation effectuée
                        sur le Site par la transmission en ligne du formulaire de rétractation, LE VENDEUR
                        enverra au Client, sans délai, un accusé de réception sur un support durable, à
                        l'adresse email fournie lors de sa commande.</p><p>Le Client supporte les coûts directs
                        de renvoi des Produits, sauf si la rétractation du Client résulte d‘une erreur dans le
                        Produit envoyé auquel cas LE VENDEUR prend à sa charge les coûts de renvoi. Le Client
                        est expressément informé que le Produit concerné doit être renvoyé à LE VENDEUR dans son
                        emballage d’origine, comprenant les notices transmises et/ou les éventuels
                        accessoires.</p><p>En cas d'exercice du droit de rétractation par le Client, l’ensemble
                        des sommes versées par le Client lui sera remboursé par LE VENDEUR dans un délai de
                        quatorze (14) jours à compter de la date à laquelle elle est informée de la décision du
                        Client de se rétracter. Ce remboursement peut être différé jusqu’à la date de
                        récupération des Produits ou jusqu’à ce que le consommateur ait fourni une preuve de
                        l’expédition de ces Produits. Le remboursement sera effectué sur le compte bancaire du
                        Client directement par l’intermédiaire du Site par virement bancaire ou par tout autre
                        moyen convenu entre les parties.</p>

                        <h3 className="text-center text-red bolder mt-4 mb-4">GARANTIE DES PRODUITS</h3>
                            <div className="mt-4 mb-4">Lorsqu'il agit en garantie
                            légale de conformité, le consommateur bénéficie d’un délai de deux ans à compter de
                            la délivrance du bien pour agir ; il peut choisir entre la réparation ou le
                            remplacement du bien, sous réserve des conditions de coût prévues par l’article
                            L.217-9 du Code de la consommation ; sauf pour les biens d’occasion, il est dispensé
                            de prouver l’existence du défaut de conformité du bien durant les 24 mois suivant la
                            délivrance du bien.<p><em>La garantie légale de conformité s’applique indépendamment
                                de la garantie commerciale éventuellement consentie.</em></p><p><em>Le
                                consommateur peut décider de mettre en œuvre la garantie contre les défauts
                                cachés de la chose vendue au sens de l’article 1641 du Code civil, à moins que
                                le vendeur n'ait stipulé qu'il ne sera obligé à aucune garantie ; dans
                                l'hypothèse d'une mise en œuvre de cette garantie, l'acheteur a le choix entre
                                la résolution de la vente ou une réduction du prix de vente conformément à
                                l’article 1644 du Code civil. Il dispose d’un délai de deux années à compter de
                                la découverte du vice.</em></p><p><em>Le report, la suspension ou l’interruption
                                de la prescription ne peut avoir pour effet de porter le délai de prescription
                                extinctive au-delà de vingt ans à compter du jour de la naissance du droit
                                conformément à l'article 2232 du Code civil.</em></p>
                            <span>Tous les Produits acquis sur le Site bénéficient des garanties
                                légales suivantes, prévues par le Code Civil et le Code de la consommation :</span>
                        </div>

                        <h3 className="text-center text-red bolder mt-4 mb-4">Garantie légale de conformité</h3>
                        <div className="mt-4 mb-4">
                            <div><p>Selon les articles L.217-4 et suivants du Code de la consommation, le vendeur est
                                tenu de livrer un bien conforme au contrat conclu avec le Client consommateur et de
                                répondre des défauts de conformité existant pendant la délivrance du Produit. La
                                garantie de conformité pourra s'exercer si un défaut devait exister au jour de la prise
                                de possession du Produit.</p><p>Toutefois, lorsque le défaut est apparu dans les 24 mois
                                qui suivent cette date, il est présumé remplir cette condition. Mais, conformément à
                                l'article L.217-7 du Code de la Consommation, « le Vendeur peut combattre cette
                                présomption si celle-ci n'est pas compatible avec la nature du Produit ou le défaut de
                                conformité invoqué ». A cet égard, pourra analyser le Produit litigieux afin de
                                déterminer si le défaut relevé existait ou non au jour de la délivrance du Produit au
                                Client. En revanche, passé ce délai de 24 mois, il reviendra au Client de prouver que le
                                défaut existait bien au moment de la prise de possession du Produit.</p><p>Conformément
                                à l'article L.217-9 du Code de la consommation : « en cas de défaut de conformité,
                                l'acheteur choisit entre la réparation et le remplacement du bien. Toutefois, le vendeur
                                peut ne pas procéder selon le choix de l'acheteur si ce choix entraîne un coût
                                manifestement disproportionné au regard de l'autre modalité, compte tenu de la valeur du
                                bien ou de l'importance du défaut. Il est alors tenu de procéder, sauf impossibilité,
                                selon la modalité non choisie par l'acheteur ».</p></div>
                        </div>

                        <h3 className="text-center text-red bolder mt-4 mb-4">
                            Garantie légale contre les vices cachés
                        </h3>
                        <div className="mt-4 mb-4">
                            <p>Selon les articles 1641 à 1649 du Code civil, le Client pourra demander l'exercice
                            de la garantie de vices cachés si les défauts présentés n'apparaissaient pas lors de
                            l'achat, étaient antérieurs à l'achat (et donc ne pas résulter de l'usure normale du
                            Produit par exemple), et sont suffisamment graves (le défaut doit soit rendre le Produit
                            impropre à l'usage auquel il est destiné, soit diminuer cet usage dans une mesure telle
                            que l'acheteur n'aurait pas acheté le Produit ou ne l'aurait pas acheté à un tel prix
                            s'il avait connu le défaut).</p><p>Les réclamations, demandes de remboursement pour un
                            Produit non conforme doivent s’effectuer par courrier postal ou par mail aux adresses
                            indiquées dans les mentions légales du Site. Le Client sera remboursé par virement
                            bancaire du montant de sa commande. Les frais de la procédure de remboursement
                            (notamment les frais de port de retour du Produit) demeureront à la charge du
                            VENDEUR.</p>
                        </div>

                        <h3 className="text-center text-red bolder mt-4 mb-4">RESPONSABILITE</h3>
                        <p className="mt-4 mb-4">Chacune des parties assume la responsabilité des conséquences résultant
                            de ses fautes, erreurs ou omissions et causant un dommage direct à l’autre partie.</p>

                        <h3 className="text-center text-red bolder mt-4 mb-4">Responsabilité du Client</h3>
                        <div className="mt-4 mb-4">
                            Le Client est seul responsable de la qualité, de la précision, de la pertinence et de
                            l’exactitude des informations qu’il renseigne sur le Site aux fins de sa commande. La
                            responsabilité du VENDEUR ne saurait être engagée à ce titre.<p></p>Le Client est ainsi
                            seul responsable à l’égard du VENDEUR et, le cas échéant, des tiers, de tous dommages,
                            directs ou indirects, de quelque nature que ce soit, causés par une information ou tout
                            autre publication communiquée, transmise ou diffusée à l’occasion des présentes, ainsi
                            que de tout manquement de sa part aux présentes stipulations contractuelles.<p></p>Le
                            Client est, en outre, seul responsable du choix des Produits et services qu’il a
                            commandés par l’intermédiaire du Site.<p></p>Tout Client s’engage à ne pas utiliser le
                            Site en contravention de l’ensemble des lois, règles et règlementations en vigueur.
                        </div>

                        <h3 className="text-center text-red bolder mt-4 mb-4">Responsabilité du VENDEUR</h3>
                        <p className="mt-4 mb-4">LE VENDEUR met en œuvre toutes les mesures propres à assurer au Client
                            la fourniture, dans des conditions optimales, de Produits et services de qualité. Elle
                            assume l’entière responsabilité des Produits et services qu’elle propose et vend aux
                            Clients par le biais du Site et traitera seules des potentielles réclamations relatives
                            auxdits Produits et services.</p><p>LE VENDEUR ne peut toutefois être tenue responsable
                        de tout dommage, qui serait imputable soit au Client, soit au fait imprévisible et
                        insurmontable d’un tiers étranger au contrat, soit à un cas de force majeure.</p><p>LE
                        VENDEUR s’assure du bon fonctionnement du Site mais ne saurait en aucun cas garantir
                        qu’il est exempt d’anomalies ou d’erreurs et qu’il fonctionne sans interruption.</p>
                        <p>LE VENDEUR ne saurait être tenu responsable du non-fonctionnement, d’une
                            impossibilité d’accès ou de dysfonctionnements des services du fournisseur d’accès
                            des Clients, à ceux du réseau Internet.</p>

                        <h3 className="text-center text-red bolder mt-4 mb-4">FORCE MAJEURE</h3>
                        <p className="mt-4 mb-4">La « force majeure » se définit comme tout évènement échappant
                            au contrôle de l’une
                            des parties et insusceptible d’être raisonnablement prévu lors de la conclusion des
                            présentes CGUV. Un tel évènement sera caractérisé dès lors que la partie, victime d’un
                            tel évènement, serait empêchée d’exécuter convenablement ses obligations contractuelles,
                            et ce, malgré la mise en œuvre de mesures adéquates et appropriées destinées à en
                            limiter les effets.</p><p>Aucune des deux parties ne sera tenue pour responsable
                        vis-à-vis de l'autre de la non-exécution ou des retards dans l'exécution d'une
                        obligation née des présentes CGUV qui seraient dus au fait de l'autre partie
                        consécutivement à la survenance d'un cas de force majeure, tel que reconnu et défini par
                        la jurisprudence française.</p><p>Le cas de force majeure suspend les obligations nées
                        des présentes CGUV pendant toute la durée de son existence, et aucune des parties ne
                        pourra, pendant cette période, valablement se prévaloir de l’existence d’un tel cas de
                        force majeure au sens de l’article 1218 du Code civil afin de justifier la fin de sa
                        relation contractuelle avec l’autre partie. Toutefois, si le cas de force majeure avait
                        une durée d'existence supérieure à trente (30) jours consécutifs, il ouvrirait droit à
                        la résiliation de plein droit des présentes CGUV par l'une ou l'autre des parties, huit
                        (8) jours après l'envoi d'une lettre recommandée avec avis de réception notifiant cette
                        décision.</p>

                        <h3 className="text-center text-red bolder mt-4 mb-4">PROPRIETE INTELLECTUELLE</h3>
                        <p className="mt-4 mb-4">Le Site, ainsi que les bases de données, textes, documents,
                            informations, images,
                            photographies, graphismes, logos, ou toutes autres données demeurent la propriété
                            exclusive du VENDEUR ou, le cas échéant, de leurs titulaires respectifs dont LE VENDEUR
                            a obtenu les autorisations d’exploitation.</p><p>LE VENDEUR demeure titulaire de
                        l’ensemble des droits de propriété intellectuelle afférents à sa marque déposée, ainsi
                        que de l’ensemble des droits de propriété intellectuelle et des droits d’auteur
                        afférents à tout autre signe distinctif lui appartenant.</p><p>Toute reproduction et/ou
                        représentation, téléchargement, traduction, adaptation, exploitation, distribution,
                        diffusion et/ou communication, sous quelque forme que ce soit, à titre commercial ou
                        non, de toute ou partie de la marque et/ou d’une œuvre de l’esprit originale ou donnée
                        contenue sur le Site est formellement interdite. Le Client s’interdit également tout
                        agissement et tout acte susceptible de porter atteinte directement ou indirectement aux
                        droits de propriété intellectuelle du VENDEUR.</p>

                        <h3 className="text-center text-red bolder mt-4 mb-4">PROTECTION DES DONNEES PERSONNELLES</h3>
                        <p className="mt-4 mb-4">Le Client est informé que la création de son compte personnel sur
                            le Site ainsi que
                            sa commande de Produits et services sur le Site donne lieu à la collecte et au
                            traitement automatisé de données à caractère personnel le concernant par LE VENDEUR dont
                            l'utilisation est soumise aux dispositions de la loi n° 78-17 du 6 janvier 1978 relative
                            à l'Informatique, aux Fichiers et aux Libertés, telle que modifiée par la loi n°
                            2016-1321 du 7 octobre 2016 et le Règlement européen 2016/679 du 27 avril 2016 relatif à
                            la protection des personnes physiques à l’égard du traitement des données à caractère
                            personnel et à la libre circulation de ces données (ci-après le « RGPD »).</p><p>LE
                        VENDEUR met à la disposition du Client, sur son Site, une charte de confidentialité
                        spécifiant l’ensemble des informations afférentes à l’utilisation des données à
                        caractère personnel du Client collectées par LE VENDEUR et aux droits dont le Client
                        dispose vis-à-vis de ces données personnelles.</p>

                        <h3 className="text-center text-red bolder mt-4 mb-4">COOKIES</h3>
                        <div className="mt-4 mb-4"><p>LE VENDEUR a recours à des « cookies », afin d'obtenir des
                            traitements statistiques
                            des et d’améliorer l’expérience de navigation du Client.</p><p>LE VENDEUR implante un «
                            cookie » dans l'ordinateur du Client avec son consentement préalable. Le Client dispose
                            d'une possibilité de refuser les cookies lorsqu'il visite le Site. La durée de
                            conservation de ces informations dans l'ordinateur du Client est de 13 mois.</p><p>LE
                            VENDEUR s’engage à ne jamais communiquer le contenu de ces « cookies » à des tierces
                            personnes, sauf en cas de réquisition légale.</p><p>Le Client peut, en outre, s'opposer
                            à l'enregistrement de « cookies » en configurant son logiciel de navigation. Pour ce
                            faire, le Client procédera au paramétrage de son navigateur :</p>
                            <ul>
                                <li>Pour Internet Explorer :
                                    <a href="http://windows.microsoft.com/fr-FR/windows-vista/Block-or-allow-cookies">
                                        http://windows.microsoft.com/fr-FR/windows-vista/Block-or-allow-cookies</a>
                                </li>
                                <li>Pour Safari : <a
                                    href="https://support.apple.com/fr-fr/ht1677">
                                    https://support.apple.com/fr-fr/ht1677</a>
                                </li>
                                <li>Pour Google Chrome : <a
                                    href="https://support.google.com/chrome/answer/95647?hl=fr&amp;hlrm=en&amp;safe=on">
                                    https://support.google.com/chrome/answer/95647?hl=fr&amp;hlrm=en&amp;safe=on</a>
                                </li>
                                <li>Pour Firefox : <a
                                    href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies">
                                    https://support.mozilla.org/fr/kb/activer-desactiver-cookies
                                </a>
                                </li>
                            </ul>
                        </div>

                        <h3 className="text-center text-red bolder mt-4 mb-4">LIENS HYPERTEXTES</h3>
                        <div className="mt-4 mb-4"><p>
                            Le Site peut inclure des liens hypertextes vers d’autres sites.</p><p>LE VENDEUR ne
                            peut, en aucun cas, être tenue de la disponibilité technique de sites Internet ou
                            d’applications mobiles exploités par des tiers auxquels le Client accéderait par
                            l’intermédiaire du Site. En outre, LE VENDEUR ne peut donc supporter aucune
                            responsabilité quant aux contenus, publicités, produits et services disponibles sur ou à
                            partir de ces sites, applications mobiles ou sources externes.</p><p>Si, en dépit des
                            efforts du VENDEUR, un des liens hypertextes présents sur le Site pointait vers un site
                            ou une source internet dont le contenu était ou paraissait non conforme aux exigences de
                            la loi française à un Client, celui-ci s’engage à prendre immédiatement contact avec le
                            directeur de la publication du Site, dont les coordonnées figurent dans les mentions
                            légales publiées sur le Site, afin de lui communiquer l’adresse des pages du site tiers
                            en cause. LE VENDEUR fera alors le nécessaire pour supprimer le lien hypertexte
                            concerné.</p></div>

                        <h3 className="text-center text-red bolder mt-4 mb-4">
                            DROIT APPLICABLE ET JURIDICTION COMPETENTE
                        </h3>
                        <div className="mt-4 mb-4">
                            <p>Les présentes CGUV sont régies par le droit Français.</p><p>En cas de litige auquel
                            les présentes CGUV (ou l’une de leurs clauses) et/ou les relations entre les parties
                            pourraient donner lieu, le Client consommateur peut saisir à son choix, outre l’une des
                            juridictions territorialement compétentes en vertu du Code de procédure civile, la
                            juridiction du lieu où il demeurait au moment de la conclusion du contrat ou de la
                            survenance du fait dommageable. Le Client professionnel devra saisir le Tribunal dans le
                            ressort duquel le VENDEUR a son siège social.</p><p>Selon l'article L.612-1 du Code de
                            la consommation, il est rappelé que « <em>tout consommateur a le droit de recourir
                                gratuitement à un médiateur de la consommation en vue de la résolution amiable du
                                litige qui l’oppose à un professionnel. A cet effet, le professionnel garantit au
                                consommateur le recours effectif à un dispositif de médiation de la
                                consommation</em> ».</p><p>Conformément à l'ordonnance n°2015-1033 du 20 août 2015
                            et au décret d’application n°2015-1382 du 30 octobre 2015, tout différend ou litige dit
                            de consommation, sous réserve de l'article L.612-2 du code de la consommation, peut
                            faire l'objet d'un règlement amiable par médiation auprès du médiateur suivant :
                            MEDIATEUR DE LA CONSOMMATION AGREE - DEVIGNY MEDIATION.</p><p>Pour soumettre son litige
                            au médiateur, le Client peut :</p>
                            <ul>
                                <li>(i) remplir le formulaire sur le site internet du médiateur :
                                    https://www.devignymediation.fr/consommateurs.php ; ou,
                                </li>
                                <li>(ii) envoyer sa demande par courrier simple ou recommandé à MEDIATEUR DE LA
                                    CONSOMMATION AGREE - DEVIGNY MEDIATION - 9, avenue René GASNIER, D01 - 49100
                                    ANGERS, ou,
                                </li>
                                <li>(iii) envoyer un email à contact@devignymediation.fr.</li>
                            </ul>
                            <p>Il est rappelé que la médiation n'est pas obligatoire mais uniquement proposée afin
                                de résoudre les litiges en évitant un recours à la justice.</p>
                        </div>

                        <h3 className="text-center text-red bolder mt-4 mb-4">Service Client</h3>
                        <p className="mt-4 mb-4">
                            Le service clientèle du présent Site est accessible par courrier électronique à
                            l’adresse suivante : independancesoundlabel@gmail.com ou par courrier postal à l’adresse
                            indiquée dans les mentions légales.</p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default LegalNotices;
