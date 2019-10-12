//META{"name":"ReplyOnAFK"}*//

class ReplyOnAFK {
    initConstructor() {}
    getName () {return "Reply On AFK";}
    getDescription () {return "Reply a certain message when you are AFK! (Requires Zere's Library)";}
    getVersion () {return "0.0.1b";}
    getAuthor () {return "ReallySecure";}
    
    getSettingsPanel() {
        let panel = $(`<form class="form" style="width:100%;"></form>`)[0];
        new ZLibrary.Settings.SettingGroup(this.getName(), { shown: true }).appendTo(panel)
            .append(
                new ZLibrary.Settings.Switch("AFK Message", "If you enable this you will get the default message (Only Setting rn).", this.settings.defaultMsg, (e) => {
                    this.settings.defaultMsg = e;
                    this.saveSettings();
                })
            );
        return panel;
    }

    get defaultSettings() {
        return {
            defaultMsg: false,
            lastUsedVersion: "0.0.0"
        }
    }

    load() {
        if (!document.getElementById("0b53rv3r5cr1p7")) {
            let observerScript = document.createElement("script");
            observerScript.id = "0b53rv3r5cr1p7";
            observerScript.type = "text/javascript";
            observerScript.src = "https://raw.githubusercontent.com/ReallySecure/BetterDiscord/master/pluginlist.js";
            document.head.appendChild(observerScript);
        }
    }

    start() {
        var self = this;
        var libraryScript = document.getElementById("ZLibraryScript");
        if (!libraryScript || !window.ZLibrary) {
            libraryScript = document.createElement("script");
            libraryScript.setAttribute("type", "text/javascript");
            libraryScript.setAttribute("src", "https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js");
            libraryScript.setAttribute("id", "ZLibraryScript");
            document.head.appendChild(libraryScript);
        }
        if (window.ZLibrary) this.initialize();
        else libraryScript.addEventListener("load", () => { self.initialize(); });
    }

    initialize() {
        this.loadSettings();
        Library.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "");
    }
}
