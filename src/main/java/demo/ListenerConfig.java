package demo;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import org.kie.api.event.process.ProcessNodeTriggeredEvent;
import org.kie.api.event.process.ProcessVariableChangedEvent;
import org.kie.kogito.internal.process.event.DefaultKogitoProcessEventListener;
import org.kie.kogito.process.impl.DefaultProcessEventListenerConfig;

@ApplicationScoped
public class ListenerConfig extends DefaultProcessEventListenerConfig {

    public ListenerConfig() {
    }

    @PostConstruct
    public void setup() {
        register(new DefaultKogitoProcessEventListener() {
            public void beforeNodeTriggered(ProcessNodeTriggeredEvent event) {
                System.out.println(event);
            }
            public void afterVariableChanged(ProcessVariableChangedEvent event) {
                System.out.println(event);
            }
        });
    }

}

